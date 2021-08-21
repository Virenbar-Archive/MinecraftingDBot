import { ContextMenuInteraction } from 'discord.js';
import { IContextMenu } from '..';

const command: IContextMenu = {
    name: 'Profile',
    cooldown: 5,
    async execute(i: ContextMenuInteraction): Promise<void> {
        await i.deferReply()
    }
}

export = command