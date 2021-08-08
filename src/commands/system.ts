import os from "os";
import { DateTime, Duration } from "luxon";
import { CommandInteraction, MessageEmbed } from 'discord.js';

import { ICommand } from '../modules/interactions';
import { formatBytes } from "../utils";

const command: ICommand = {
    name: 'system',
    description: 'Получить информацию о системе',
    cooldown: 5,
    async execute(i: CommandInteraction) {
        await i.deferReply()
        const pUptime = Duration.fromMillis(process.uptime() * 1000)
        const osUptime = Duration.fromMillis(os.uptime() * 1000)
        const startDate = DateTime.local().minus(osUptime)

        const Embed = new MessageEmbed()
            .setTitle("Информация о системе")
            .setDescription(`**OS**: ${os.version()}(${os.release()})`)
            .addField("OS last restart", startDate.toFormat("GG yyyy.LL.dd"), true)
            .addField("CPU", os.cpus()[0].model, true)
            .addField('\u200b', '\u200b')
            .addField("Total memory", formatBytes(os.totalmem()), true)
            .addField("Free memory", formatBytes(os.freemem()), true)
            .addField('\u200b', '\u200b')
            .addField("OS Uptime", osUptime.toFormat("d.hh:mm:ss"), true)
            .addField("Bot Uptime", pUptime.toFormat("d.hh:mm:ss"), true)
            .setColor(0x1F043D)

        await i.editReply({ embeds: [Embed] })
    }
}

export = command