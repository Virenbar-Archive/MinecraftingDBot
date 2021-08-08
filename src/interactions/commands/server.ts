import { status } from "minecraft-server-util"
import { CommandInteraction } from 'discord.js';
import { ICommand } from '..';

const command: ICommand = {
    name: 'server',
    description: 'Состояние сервера',
    cooldown: 5,
    async execute(i: CommandInteraction) {
        await i.deferReply()
        try {
            const data = await status("ebs.virenbar.ru")

            await i.editReply({
                embeds: [{
                    title: ':green_circle: EBS is Online',
                    description: `Players: ${data.onlinePlayers}\\${data.maxPlayers}`,
                    color: 0x1F043D
                }]
            })
        } catch (err) {
            await i.editReply({
                embeds: [{
                    title: ':red_circle: EBS is Offline',
                    color: 0x1F043D
                }]
            })
        }

    }
}

export = command
