import { GuildMember, Message, MessageEmbed, PermissionString } from 'discord.js'
import SuperClient from '../SuperClient';
import Server from '../structures/Server';

interface CommandOptions{
    name: string
    aliases: string[],
    description: string,
    usage: string | null,
    permission: PermissionString | undefined,
    examples: string[]
}

export default abstract class Command{

    protected constructor(protected readonly props: CommandOptions){}

    public get name(): string{
        return this.props.name
    }

    public get aliases(): string[]{
        return this.props.aliases
    }

    public get description(): string{
        return this.props.description
    }

    public get usage(): string | null{
        return this.props.usage
    }

    public get permission(): string | undefined{
        return this.props.permission
    }

    public get examples(): string[]{
        return this.props.examples
    }

    public hasPermission(member: GuildMember): boolean{
        if(this.props.permission){
            return member.hasPermission(this.props.permission)
        }

        return true
    }

    public abstract run(client: SuperClient, server: Server, message: Message, args: string[]): Promise<boolean>

    public getErrorEmbed(error: string): MessageEmbed{
        return new MessageEmbed()
            .setDescription('<:error:812708631035248670> ' + error)
            .setColor('RED')
    }

}
