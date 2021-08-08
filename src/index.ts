import Discord, { Client, Intents } from "discord.js"
import { Logger } from "log4js"
import dotenv from "dotenv"
dotenv.config()

import { loadLogger } from "./lib/logger"
import { IConfig, loadConfig } from './lib/config'
export { State, saveState } from './lib/state'
import { loadState } from './lib/state'

import Interactions from './interactions';
import Modules from './modules'
import Events from "./events"

const myIntents = new Intents();
myIntents.add(
    'GUILD_INTEGRATIONS', 'GUILD_VOICE_STATES',
    'GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS',
    'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS');

export const Bot = new Discord.Client({ intents: myIntents }) as IBot

loadLogger()
loadConfig()
loadState()

//
Interactions.Load(Bot)
Events.RegisterEvents(Bot)
Modules.LoadModules(Bot)

/*
//Events
Bot.on('ready', () => {
    logger.info(`Logged in as ${Bot.user.tag}!`)
});*/

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