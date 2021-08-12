import { status } from "minecraft-server-util"

import { IModule } from "."
import { DClient } from '../index'
import { sleep } from '../utils'

//var lastOnline = Infinity
let Bot: DClient
//let host: string
//let port: number
let server: { host: string, port: number }
//
let max = 0
let online = 0
let players: string[] = []

function Load(client: DClient): void {
    Bot = client
    server = client.config.mcServer
    //host = client.config.mcServer.host
    //port = client.config.mcServer.port
}

async function CountLoop(): Promise<void> {
    for (; ;) {
        try {
            const data = await status(server.host, { port: server.port })
            online = data.onlinePlayers
            max = data.maxPlayers
            players = data.samplePlayers.map((p) => { return p.name })
            /* if (online != lastOnline) {
                await BotClient.user.setActivity("на " + online + " из " + max + " игроков", { "type": "WATCHING" })
                lastOnline = online
            } */
            await sleep(10 * 1000)
        } catch (err) {
            Bot.logger.error('Player Count - Error')
            Bot.logger.error(err)
            await sleep(60 * 1000)
        }
    }
}

export { online, max, players }

const Module: IModule = { Load: Load, Run: CountLoop }
export default Module
