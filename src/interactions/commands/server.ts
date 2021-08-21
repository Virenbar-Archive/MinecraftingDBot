import { CommandInteraction } from 'discord.js';
import { ICommand } from '..';

const command: ICommand = {
    name: 'server',
    description: 'Display info about this server.',
    cooldown: 5,
    async execute(i: CommandInteraction) {
        await i.guild.fetch()
        await i.reply({
            embeds: [{
                title: `Server name: **${i.guild.name}**`,
                description: `Total members: ${i.guild.memberCount}`,
                color: 0x1F043D
            }]
        })
    }
}

export = command

