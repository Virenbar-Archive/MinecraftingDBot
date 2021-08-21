import { configure, getLogger, Logger } from "log4js"
import Discord, { Client, Intents } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

import { Config, IConfig, loadConfig } from './lib/config'

export { State, saveState } from './lib/state'
import { loadState } from './lib/state'
import Modules from './modules'

configure({
    appenders: {
        debugFile: { type: "file", filename: "logs/debug.log", maxLogSize: 1024 * 1024 * 10, backups: 5, compress: true },
        errorFile: { type: "file", filename: "logs/error.log", maxLogSize: 1024 * 1024 * 10, backups: 5, compress: true },
        console: { type: "console", layout: { type: "colored" } },
        errors: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
    },
    categories: {
        default: { appenders: ["console", "debugFile", "errors"], level: "debug" }
    }
});
const logger = getLogger("DBot")

loadConfig()
loadState()

const myIntents = new Intents();
myIntents.add(
    'GUILD_INTEGRATIONS', 'GUILD_VOICE_STATES',
    'GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS',
    'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'
);

export const Bot = new Discord.Client({ intents: myIntents }) as IBot
Bot.logger = logger
Bot.config = Config

Modules.LoadModules(Bot)

//Events
Bot.on('ready', () => {
    logger.info(`Logged in as ${Bot.user.tag}!`)
});

//Login
const token = process.env.token
Bot.login(token);

export interface IBot extends Client {
    /** Основные настройки
     * @type {IConfig}
     * @memberof DClient
     */
    "config": IConfig,
    "logger": Logger
}