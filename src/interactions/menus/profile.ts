import { ContextMenuInteraction, MessageEmbed } from 'discord.js';
import { IContextMenu } from '..';
import { remIndent } from '../../utils';

const command: IContextMenu = {
    name: 'Profile',
    cooldown: 5,
    async execute(i: ContextMenuInteraction): Promise<void> {
        await i.deferReply({ ephemeral: true })

        const member = await i.guild.members.fetch(i.targetId)
        const user = member.user
        const url = user.avatarURL({ dynamic: true, format: 'png', size: 512 })

        const Embed = new MessageEmbed()
            .setTitle(`Информация о участнике ${member.displayName}(${user.tag})`)
            .setThumbnail(url)
            .setDescription(remIndent(
                `Зарегистрирован: <t:${Math.trunc(user.createdTimestamp / 1000)}>
                Присоединился: <t:${Math.trunc(member.joinedTimestamp / 1000)}>
                ${user}`))
            .setColor(0x1F043D)

        await i.editReply({ embeds: [Embed] })
    }
}

export = command