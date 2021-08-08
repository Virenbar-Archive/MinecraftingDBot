import { TextChannel } from "discord.js"

import type { IModule } from "."
import type { IBot } from '..'
import type { IConfig } from "../lib/config"
import { sleep } from "../utils"

let Bot: IBot
let Config: IConfig

function Load(client: IBot): void {
    Bot = client
    Config = client.config
}

async function Run(): Promise<void> {
    for (; ;) {
        try {
            await CheckForum()
        } catch (err) {
            Bot.logger.error("Forum - Unknown Error")
            Bot.logger.error(err)
        } finally {
            await sleep(10 * 60 * 1000)
        }
    }
}
async function CheckForum() {
    //
    const channel = await Bot.channels.fetch(Config.channels.chNews) as TextChannel
    channel.send("Tets")
}

const Module: IModule = { Load, Run }
export default Module