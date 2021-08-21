import os from "os";
import { DateTime, Duration } from "luxon";
import { CommandInteraction, MessageEmbed } from 'discord.js';

import { ICommand } from '..';
import { formatBytes, remIndent } from "../../utils";

const command: ICommand = {
    name: 'system',
    description: 'Получить информацию о системе',
    cooldown: 5,
    async execute(i: CommandInteraction) {
        await i.deferReply()
        const pUptime = Duration.fromMillis(process.uptime() * 1000)
        const osUptime = Duration.fromMillis(os.uptime() * 1000)
        const startDate = DateTime.local().minus(osUptime)
        const cpu = os.cpus()

        const memFull = os.totalmem()
        const memFree = os.freemem()
        const memUsed = memFull - memFree

        const Embed = new MessageEmbed()
            .setTitle("Информация о системе")
            .setDescription(remIndent(
                `**OS**: ${os.version()}(${os.release()})            
                **OS last restart:** ${startDate.toFormat("GG yyyy.LL.dd")}
                **CPU:** ${cpu[0].model} ${cpu.length}x${cpu[0].speed} MHz
                **Memory:** ${formatBytes(memUsed)} ${formatBytes(memFull)}
                **OS Uptime:** ${osUptime.toFormat("d.hh:mm:ss")}
                **Bot Uptime:** ${pUptime.toFormat("d.hh:mm:ss")}`))
            .addField("OS Uptime", osUptime.toFormat("d.hh:mm:ss"), true)
            .addField("Bot Uptime", pUptime.toFormat("d.hh:mm:ss"), true)
            .setColor(0x1F043D)

        await i.editReply({ embeds: [Embed] })
    }
}

export = command