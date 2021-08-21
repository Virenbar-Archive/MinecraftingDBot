import { ApplicationCommandData, ApplicationCommandOptionData, Collection, CommandInteraction, SelectMenuInteraction, Snowflake } from 'discord.js';
import fs from 'fs';
import path from "path";
//import glob from 'glob';

import { IModule } from '.';
import { IBot } from '..'

const Commands = new Collection<string, ICommand>();
const Path = path.join(__dirname, '../commands/')

let Bot: IBot
let Config: { guild: Snowflake, channel: Snowflake }

function Load(client: IBot): void {
    Bot = client
    Config = client.config.primary
}

async function Run(): Promise<void> {
    try {
        //const commandFiles = glob(`${__dirname}/commands/*.{.js,.ts}`)
        const commandFiles = fs.readdirSync(Path).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command: ICommand = await import(Path + file);
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module

            Commands.set(command.name, command);
        }
        const CommandData = Commands.map<ApplicationCommandData>((v, k) => { return { name: k, description: v.description, options: v.options } })
        //const Acommands = await Bot.application?.commands.set([])
        await Bot.guilds.cache.get(Config.guild)?.commands.set(CommandData)
        //await Bot.guilds.cache.get('298505396719452160')?.commands.set(CommandData)

        AddHandler()
    } catch (err) {
        Bot.logger.error('Error loading interactions module')
        Bot.logger.error(err)
    }
}

function AddHandler(): void {
    Bot.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (!Commands.has(interaction.commandName)) return;

        try {
            await Commands.get(interaction.commandName).execute(interaction);
        } catch (err) {
            Bot.logger.error(err);
            //await interaction.reply({ content: 'Ошибка выполнения команды', ephemeral: true });
        }
    });
}

const Module: IModule = { Load: Load, Run: Run }
export default Module

export interface ICommand {
    name: string,
    description: string,
    cooldown: number,
    options?: ApplicationCommandOptionData[],
    execute(Interaction: CommandInteraction): Promise<void>,
}

export interface IContextMenu {
    name: string,
    cooldown: number,
    execute(Interaction: SelectMenuInteraction): Promise<void>,
}