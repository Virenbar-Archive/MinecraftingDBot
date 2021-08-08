import { CommandInteraction } from 'discord.js';
import { ICommand } from '../modules/interactions';

const command: ICommand = {
    name: 'myjob',
    description: 'My job here is done',
    cooldown: 5,
    options: [{
        name: "user",
        description: "Пользователь",
        required: false,
        type: "USER"
    }],
    async execute(i: CommandInteraction): Promise<void> {
        await i.deferReply()
        const user = i.options.getUser('user') || i.user
        await i.editReply({
            embeds: [{
                description: `${user} закончил свою работу здесь.`,
                image: { url: "https://c.tenor.com/pagVxAkHfWAAAAAC/my-job-here-is-done-bye.gif" },
                color: 0x1F043D
            }]
        })
    }
}

export = command