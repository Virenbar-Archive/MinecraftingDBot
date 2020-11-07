//require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
//const moment = require('moment');
//const config = require('./config.json');
//Imports
import { configure, getLogger } from "log4js";
import Discord from "discord.js"
import { loadState } from './state';
import playercount from './modules/playercountA'
import activities from './modules/activities'
import echo from './modules/echo'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import bans from './modules/bans'
import voicelog from './modules/voicelog'

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
export const logger = getLogger()
export const BotClient = new Discord.Client();
const token = process.env.token
loadState()

//Modules
playercount()
echo()
//bans()
voicelog()
activities()

//Events
BotClient.on('ready', () => {
  logger.info(`Logged in as ${BotClient.user.tag}!`)
});
//let eventDragon = moment().weekday(6).set({ 'hour': 19, 'minute': 0, "second": 0, "ms": 0 });
//console.log(eventDragon.format())

//Login
BotClient.login(token);
