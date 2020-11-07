import { Client, Channel, VoiceChannel } from "discord.js";

//const discord = require('discord.js');
import MC = require('minecraft-server-util');
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const wait = 10 * 1000
var lastOnline = 100

async function updateCount(channel: VoiceChannel) {
    try {
        let data = await MC.status('minecrafting.ru', { port: 25565 })
        let online = data.onlinePlayers
        let max = data.maxPlayers
        if (online != lastOnline) {
            await channel.setName("Игроков: " + online + "/" + max)
            lastOnline = online
        }
        await sleep(wait)
    } catch (err) {
        console.log(err)
        await sleep(wait * 2)
    } finally {
        updateCount(channel)
    }
}

module.exports = function playercount(client: Client, chID: string) {
    client.on("ready", async () => {
        let channel = await client.channels.fetch(chID) as VoiceChannel
        updateCount(channel)
        // setInterval(() => {
        // }, 10 * 1000);
    })
}
