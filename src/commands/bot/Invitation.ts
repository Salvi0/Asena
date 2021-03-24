import Command from '../Command';
import SuperClient from '../../SuperClient';
import { Message, MessageEmbed } from 'discord.js';
import Server from '../../structures/Server';

const DOMAIN = 'asena.xyz'
const URLMap = {
    INVITE: `https://invite.${DOMAIN}`,
    SUPPORT_SERVER: `https://dc.${DOMAIN}`,
    WIKI: `https://wiki.${DOMAIN}`,
    WEBSITE: `https://${DOMAIN}`,
    GITHUB: `https://dev.${DOMAIN}`,
    VOTE: 'https://top.gg/bot/716259870910840832/vote'
}

export default class Invitation extends Command{

    constructor(){
        super({
            name: 'davet',
            aliases: ['invite', 'vote', 'davetiye', 'link', 'wiki'],
            description: 'commands.bot.invitation.description',
            usage: null,
            permission: undefined,
            examples: []
        })
    }

    async run(client: SuperClient, server: Server, message: Message, args: string[]): Promise<boolean>{
        const embed = new MessageEmbed()
            .setAuthor(SuperClient.NAME, SuperClient.AVATAR)
            .addField(`🌈  **${server.translate('commands.bot.invitation.bot.url')}:**`, `[${server.translate('commands.bot.invitation.click.invite')}](${URLMap.INVITE})`)
            .addField(`<:hayalet:739432632030593105>  **${server.translate('commands.bot.invitation.support.server')}:**`, `[${server.translate('commands.bot.invitation.click.join')}](${URLMap.SUPPORT_SERVER})`)
            .addField(`🌎  **${server.translate('commands.bot.invitation.website')}:**`, `[asena.xyz](${URLMap.WEBSITE}) - [wiki.asena.xyz](${URLMap.WIKI})`)
            .addField(`🎊  **${server.translate('commands.bot.invitation.vote')}:**`, `[${server.translate('commands.bot.invitation.click.vote')}](${URLMap.VOTE})`)
            .addField(`📂  **${server.translate('commands.bot.invitation.open.source')}:**`, `[GitHub](${URLMap.GITHUB})`)
            .setColor(message.guild.me.displayHexColor)

        await message.channel.send({ embed })
        return true
    }

}
