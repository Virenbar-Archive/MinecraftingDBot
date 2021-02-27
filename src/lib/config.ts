
import fs from "fs"
import path from "path"

import { logger } from '../index'

const file = path.join(__dirname, '../../config.json')
let fsw: fs.FSWatcher
export let config: Config

export default function (watch = false): void {
    if (fs.existsSync(file)) {
        Load()
        if (watch) {
            fsw = fs.watch(file)
            fsw.on('change', () => {
                logger.debug('Reloading config')
                Load()
            })
        }
    } else {
        throw new Error("No config found");
    }
}
function Load(): void {
    const raw = fs.readFileSync(file, 'utf8')
    config = ParceConfig(JSON.parse(raw))

}
function ParceConfig(config: ConfigFile): Config {
    return {
        "prefix": config.prefix,
        "token": config.token,
        "chVoiceLog": config.chVoiceLog,
        "chNews": config.chNews,
        "chMinecraft": config.chMinecraft,
        "chServerLog": config.chServerLog,
        "bansPage": config.bansPage,
        "badUsers": new Set<string>(config.badUsers)
    }
}

interface Config {
    "prefix": string,
    "token": string,
    "chVoiceLog": string,
    "chNews": string,
    "chMinecraft": string,
    "chServerLog": string,
    "bansPage": string,
    "badUsers": Set<string>
}
interface ConfigFile {
    "prefix": string,
    "token": string,
    "chVoiceLog": string,
    "chNews": string,
    "chMinecraft": string,
    "chServerLog": string,
    "bansPage": string,
    "badUsers": string[]
}