import { Constants, Interaction } from "discord.js";

import { IEvent } from ".";
import { Bot } from "..";
import { Commands, ContextMenus } from "../interactions";

const event: IEvent = {
    name: 'Interaction create',
    event: Constants.Events.INTERACTION_CREATE,
    async execute(i: Interaction): Promise<void> {
        //TODO Cooldown
        try {
            if (i.isCommand() && Commands.has(i.commandName)) {
                Bot.logger.info(`User: ${i.user.username} Command: ${i.commandName}`)
                await Commands.get(i.commandName).execute(i);
            } else if (i.isContextMenu() && ContextMenus.has(i.commandName)) {
                Bot.logger.info(`User: ${i.user.username} Context menu: ${i.commandName}`)
                await ContextMenus.get(i.commandName).execute(i);
            } else {
                Bot.logger.error('Unknown interaction')
                Bot.logger.error(i.toJSON())
            }
        } catch (err) {
            Bot.logger.error(`Interaction failed: ${i.id}`)
            Bot.logger.error(err);
        }
    }
}

export = event