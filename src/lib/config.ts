
import { Snowflake } from "discord.js"
import fs from "fs"
import path from "path"

import { logger } from '../index'

const file = path.join(__dirname, '../../config.json')
let fsw: fs.FSWatcher

export let Config: IConfig

export function loadConfig(watch = false): void {
    if (fs.existsSync(file)) {
        readConfig()
        if (watch) {
            fsw = fs.watch(file)
            fsw.on('change', () => {
                logger.debug('Reloading config')
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
    logger.info(Config)
}
/*
function ParceConfig(config: ConfigFile): Config {
    return {
        "prefix": config.prefix,
        "token": config.token,
        "mcServer": config.mcServer,
        "chVoiceLog": config.chVoiceLog,
        "chNews": config.chNews,
        "chMinecraft": config.chMinecraft,
        "chServerLog": config.chServerLog,
        "bansPage": config.bansPage,
        "badUsers": new Set<string>(config.badUsers)
    }
}

interface Config extends Omit<ConfigFile, "badUsers"> {
    "badUsers": Set<string>
}
*/
export interface IConfig {
    "prefix": string,
    "token": string,
    "mcServer": {
        "host": string,
        "port": number
    }
    "chVoiceLog": {
        "guild": Snowflake,
        "channel": Snowflake
    },
    "chNews": Snowflake,
    "chMinecraft": Snowflake,
    "chServerLog": Snowflake,
    "bansPage": string,
    "badUsers": string[]
}