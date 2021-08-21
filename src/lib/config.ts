
import { Snowflake } from "discord.js"
import fs from "fs"
import path from "path"

import { Bot } from '..'

const file = path.join(__dirname, '../../config.json')
let fsw: fs.FSWatcher

export let Config: IConfig

export function loadConfig(watch = false): void {
    if (fs.existsSync(file)) {
        readConfig()
        if (watch) {
            fsw = fs.watch(file)
            fsw.on('change', () => {
                Bot.logger.debug('Reloading config')
                readConfig()
            })
        }
    } else {
        throw new Error("No config found");
    }
}

function readConfig(): void {
    const raw = fs.readFileSync(file, 'utf8')
    Config = JSON.parse(raw)
    Bot.logger.info(Config)
}

export interface IConfig {
    "token": string,
    "primary": {
        "guild": Snowflake,
        "channel": Snowflake
    },
    "channels": {
        "chNews": Snowflake,
        "chMinecraft": Snowflake,
        "chServerLog": Snowflake
    },
    "mcServer": {
        "host": string,
        "port": number
    }
    "chVoiceLog": {
        "guild": Snowflake,
        "channel": Snowflake
    },

    "bansPage": string,
    "badUsers": string[]
}