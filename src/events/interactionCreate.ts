import { Constants, Interaction } from "discord.js";

import { IEvent } from ".";
import { Bot } from "..";
import { Commands, ContextMenus } from "../interactions";

const event: IEvent = {
    name: '',
    event: Constants.Events.INTERACTION_CREATE,
    async execute(interaction: Interaction): Promise<void> {
        try {
            if (interaction.isCommand() && Commands.has(interaction.commandName)) {
                await Commands.get(interaction.commandName).execute(interaction);
            } else if (interaction.isContextMenu() && ContextMenus.has(interaction.commandName)) {
                await ContextMenus.get(interaction.commandName).execute(interaction);
            }
        } catch (err) {
            Bot.logger.error(err);
        }
    }
}

export = event