import { status } from "minecraft-server-util"

import { IModule } from "."
import { logger, Config } from '../index'
import { sleep } from '../utils'

//var lastOnline = Infinity
let host: string
let port: number
//
let max = 0
let online = 0
let players: string[] = []

function Load(): void {
    host = Config.mcServer.host
    port = Config.mcServer.port
}

async function CountLoop(): Promise<void> {
    for (; ;) {
        try {
            const data = await status(host, { port: port })
            online = data.onlinePlayers
            max = data.maxPlayers
            players = data.samplePlayers.map((p) => { return p.name })
            /* if (online != lastOnline) {
                await BotClient.user.setActivity("на " + online + " из " + max + " игроков", { "type": "WATCHING" })
                lastOnline = online
            } */
            await sleep(10 * 1000)
        } catch (err) {
            logger.error('Player Count - Error')
            logger.error(err)
            await sleep(60 * 1000)
        }
    }
}

export { online, max, players }
export default { Load: Load, Run: CountLoop } as IModule