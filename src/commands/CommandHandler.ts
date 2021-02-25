import { Collection, Message, MessageEmbed, TextChannel } from 'discord.js';

import CommandRunner from './CommandRunner';
import Command from './Command';
import SuperClient from '../SuperClient';
import Constants from '../Constants';
import Factory from '../Factory';
import PermissionController from '../controllers/PermissionController';
import CommandPool from './CommandPool';

type CommandMap = Collection<string, Command>

export default class CommandHandler extends Factory implements CommandRunner{

    private permissionController: PermissionController = new PermissionController()

    private commands: CommandMap = new Collection<string, Command>()
    private aliases: Collection<string, string> = new Collection<string, string>()

    public registerAllCommands(): void{
        for(const command of new CommandPool){
            this.registerCommand(command)
        }

        this.client.logger.info(`Toplam ${this.commands.keyArray().length} komut başarıyla yüklendi.`)
    }

    public registerCommand(command: Command){
        this.commands.set(command.name, command)

        if(command.aliases && Array.isArray(command.aliases)){
            command.aliases.forEach(alias => {
                this.aliases.set(alias, command.name)
            })
        }
    }

    protected getPermissionController(): PermissionController{
        return this.permissionController
    }

    async run(message: Message){
        const client: SuperClient = this.client

        if(!message.guild){
            return
        }

        if(message.author.bot){
            return
        }

        const channel = message.channel
        if(!(channel instanceof TextChannel)){
            return
        }

        let server = await client.servers.get(message.guild.id)
        if(!server){
            server = await client.servers.create({
                server_id: message.guild?.id
            } as any)
        }

        const prefix = (client.isDevBuild ? 'dev' : '') + (server.prefix || client.prefix)
        if(!message.content.startsWith(prefix)){
            if(message.content === Constants.PREFIX_COMMAND){
                await channel.send(`🌈   ${server.translate('commands.handler.prefix', server.prefix)}`)
            }

            return
        }

        if(!message.member){
            return
        }

        const channel_id: string = this.client.getSetupManager().getSetupChannel(message.member.id)
        if(channel_id && channel_id === message.channel.id){ // check setup
            return
        }

        const args: string[] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g)
        const cmd = args.shift().toLowerCase()

        if(cmd.length === 0){
            return
        }

        let command: Command | undefined = this.commands.get(cmd);
        if(!command){ // control is alias command
            command = this.commands.get(this.aliases.get(cmd))
        }

        if(command){
            const authorized: boolean = command.hasPermission(message.member) || message.member.roles.cache.filter(role => {
                return role.name.trim().toLowerCase() === Constants.PERMITTED_ROLE_NAME
            }).size !== 0 || server.isPublicCommand(command.name)
            if(authorized){
                const checkPermissions = this.getPermissionController().checkSelfPermissions(
                    message.guild,
                    message.channel
                )
                if(checkPermissions.has){
                    command.run(client, server, message, args).then(async (result: boolean) => {
                        if(!result){
                            const embed = new MessageEmbed()
                                .setAuthor(SuperClient.NAME, SuperClient.AVATAR)
                                .setDescription(`${server.translate('global.usage')}: **${command.name} ${server.translate(command.usage)}**`)
                                .setColor('GOLD')

                            await channel.send({ embed })
                        }
                    })
                }else{
                    if(checkPermissions.missing.includes('SEND_MESSAGES') || checkPermissions.missing.includes('VIEW_CHANNEL')){
                        try{
                            message.author.createDM().then(dmChannel => {
                                dmChannel.send(server.translate('commands.handler.permission.missing.message', channel.name))
                            })
                        }catch(e){}
                    }else{
                        let i = 1
                        const missingToString = checkPermissions
                            .missing
                            .map(permission => `**${i++}.** ${server.translate(`global.permissions.${PermissionController.humanizePermission(permission)}`)}`)
                            .join('\n')

                        await channel.send(server.translate('commands.handler.permission.missing.others', missingToString))
                    }
                }
            }else{
                await channel.send({
                    embed: command.getErrorEmbed(server.translate('commands.handler.unauthorized'))
                })
            }
        }
    }

    public getCommandsArray(): Command[]{
        return Array.from(this.commands.values())
    }

    public getCommandsMap(): CommandMap{
        return this.commands
    }

}
