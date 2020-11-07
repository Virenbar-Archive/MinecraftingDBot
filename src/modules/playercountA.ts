import { status } from "minecraft-server-util"
import { BotClient } from '../index'
import { sleep } from '../utils'

//var lastOnline = Infinity
export let max = 0
export let online = 0
export let players: string[] = []

async function updateCount() {
    try {
        const data = await status('minecrafting.ru', { port: 25565 })
        online = data.onlinePlayers
        max = data.maxPlayers
        players = data.samplePlayers.map((p) => { return p.name })
        /* if (online != lastOnline) {
            await BotClient.user.setActivity("на " + online + " из " + max + " игроков", { "type": "WATCHING" })
            lastOnline = online
        } */
        await sleep(10 * 1000)
    } catch (err) {
        console.log(err)
        await sleep(60 * 1000)
    } finally {
        updateCount()
    }
}

export default function (): void {
    BotClient.on("ready", async () => {
        updateCount()
    })
}
