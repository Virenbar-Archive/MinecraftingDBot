import { CommandInteraction } from 'discord.js';
import { ICommand } from '../modules/interactions';

const command: ICommand = {
    name: 'hornypolice',
    description: 'Call a police officer!',
    cooldown: 5,
    async execute(i: CommandInteraction): Promise<void> {
        await i.reply({
            embeds: [{
                description: "Horny police arrived!",
                image: { url: "https://cdn.discordapp.com/attachments/870398903864942662/873665579515535401/HornyPolice.png" },
                color: 0x2F64B4
            }]
        })
    }
}

export = command