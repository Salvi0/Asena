import { Guild, MessageEmbed, WebhookClient } from 'discord.js';
import { getDateTimeToString } from './utils/DateTimeHelper';

export default class SyntaxWebhook extends WebhookClient{

    constructor(){
        super(
            process.env.WEBHOOK_ID,
            process.env.WEBHOOK_TOKEN
        )
    }

    public async resolveGuild(guild: Guild, isCreate: boolean = true): Promise<void>{
        const embed = new MessageEmbed()
            .setAuthor(`${isCreate ? 'Yeni Sunucuya Eklendi' : 'Sunucudan Silindi'}`, guild.iconURL() ?? guild.bannerURL())
            .setDescription([
                `Sunucu: **${guild.name}**`,
                `Sunucu ID: **${guild.id}**`,
                `Sunucu Sahibi: **${guild.owner ? guild.owner.displayName : 'Bilinmiyor.'}**`,
                `Sunucu Sahibi ID: **${guild.ownerID}**`,
                `Üye Sayısı: **${guild.members.cache.size}**`,
                `Sunucu Kurulma Tarihi: **${getDateTimeToString(guild.createdAt)}**`
            ].join('\n'))
            .setColor(isCreate ? 'GREEN' : 'RED')
            .setTimestamp()

        await this.send({
            embeds: [embed]
        })
    }

}
