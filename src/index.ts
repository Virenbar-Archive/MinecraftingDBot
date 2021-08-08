import { configure, getLogger } from "log4js"
import Discord, { Intents } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

export { Config } from './lib/config'
import { loadConfig } from './lib/config'

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
        default: { appenders: ["console", "debugFile", "erorrs"], level: "debug" }
    }
});
export const logger = getLogger("DBot")

loadConfig()
loadState()

const myIntents = new Intents();
myIntents.add(
    'GUILD_INTEGRATIONS', 'GUILD_VOICE_STATES',
    'GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS',
    'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'
);

const BotClient = new Discord.Client({ intents: myIntents })
const token = process.env.token

Modules.LoadModules(BotClient)

//Events
BotClient.on('ready', () => {
    logger.info(`Logged in as ${BotClient.user.tag}!`)
});

//Login
BotClient.login(token);

//Modules
//echo()
//bans()
//voicelog()
//reactions()

//let eventDragon = moment().weekday(6).set({ 'hour': 19, 'minute': 0, "second": 0, "ms": 0 });
//console.log(eventDragon.format())

