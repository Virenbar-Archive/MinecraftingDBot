import { Client } from 'discord.js';
import interactions from './interactions';
import count from "./playercountA";
import activities from "./activities";
import voicelog from "./voicelog";

function LoadModules(client: Client): void {
    interactions.Load(client)
    activities.Load(client)
    voicelog.Load(client)
    count.Load(client)

    client.on('ready', async () => {
        count.Run()
        activities.Run()
        voicelog.Run()
    })
}

export interface IModule {
    Load(client: Client): void,
    Run(): Promise<void>
}

export default { LoadModules }