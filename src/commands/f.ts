import { CommandInteraction } from 'discord.js';
import { ICommand } from '../modules/interactions';

const command: ICommand = {
    name: 'f',
    description: 'Press F!',
    cooldown: 5,
    async execute(i: CommandInteraction): Promise<void> {
        await i.reply({
            embeds: [{
                description: "Let's pay some respect.",
                image: { url: "https://c.tenor.com/H8DA2jkNgtwAAAAC/team-fortress2-pay-respects.gif" },
                color: 0x1F043D
            }]
        })
    }
}

export = command