import fs from 'fs';
import path from "path";
import { ApplicationCommandData, ApplicationCommandOptionData, Client, Collection, CommandInteraction } from 'discord.js';
//import glob from 'glob';

import { IModule } from '.';
import { logger } from '../index'

const Commands = new Collection<string, ICommand>();
const Path = path.join(__dirname, '../commands/')
let Bot: Client

function Load(client: Client): void {
    Bot = client
    Bot.on('ready', ReadyHandler)
}

async function ReadyHandler(): Promise<void> {
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
        await Bot.guilds.cache.get('227803301725339649')?.commands.set(CommandData)
        //await Bot.guilds.cache.get('298505396719452160')?.commands.set(CommandData)

        AddHandler()
    } catch (err) {
        logger.error('Error loading interactions module')
        logger.error(err)
    }
}

function AddHandler(): void {
    Bot.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (!Commands.has(interaction.commandName)) return;

        try {
            await Commands.get(interaction.commandName).execute(interaction);
        } catch (err) {
            logger.error(err);
            //await interaction.reply({ content: 'Ошибка выполнения команды', ephemeral: true });
        }
    });
}

export default { Load: Load } as IModule

export interface ICommand {
    name: string,
    description: string,
    cooldown: number,
    options?: ApplicationCommandOptionData[],
    execute(Interaction: CommandInteraction): Promise<void>,
}