import { CommandInteraction } from 'discord.js';
import { ICommand } from '..';

const command: ICommand = {
    name: 'guild',
    description: 'Display info about this guild.',
    cooldown: 5,
    async execute(i: CommandInteraction) {
        await i.guild.fetch()
        await i.reply({
            embeds: [{
                title: `Guild name: **${i.guild.name}**`,
                description: `Total members: ${i.guild.memberCount}`,
                color: 0x1F043D
            }]
        })
    }
}

export = command