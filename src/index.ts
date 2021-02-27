
//Imports
import { configure, getLogger } from "log4js";
import Discord from "discord.js"
import dotenv from "dotenv"
dotenv.config()

import config from './lib/config'
import { loadState } from './lib/state';
import playercount from './modules/playercountA'
import activities from './modules/activities'
import echo from './modules/echo'
import voicelog from './modules/voicelog'
import reactions from './modules/reactions'
//import bans from './modules/bans'

configure({
  appenders: {
    file: { type: "file", filename: "logs/debug.log", maxLogSize: 1024 * 1024 * 10, backups: 5, compress: true },
    console: { type: "console", layout: { type: "colored" } },
    "err-filter": { type: 'logLevelFilter', appender: 'console', level: 'error' }
  },
  categories: {
    default: { appenders: ["file", "console"], level: "debug" }
  }
});
export const logger = getLogger("DBot")
export const BotClient = new Discord.Client();
const token = process.env.token

config(true)
loadState()

//Modules
playercount()
echo()
//bans()
voicelog()
activities()
reactions()

//Events
BotClient.on('ready', () => {
  logger.info(`Logged in as ${BotClient.user.tag}!`)
});
//let eventDragon = moment().weekday(6).set({ 'hour': 19, 'minute': 0, "second": 0, "ms": 0 });
//console.log(eventDragon.format())

//Login
BotClient.login(token);
