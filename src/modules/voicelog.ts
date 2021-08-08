import { Client, TextChannel, VoiceState } from "discord.js"

import { IModule } from "."
import { logger, Config } from '../index'

let channel: TextChannel
let Bot: Client

function Load(client: Client): void {
    Bot = client
    console.log(Config.chVoiceLog.guild)
    console.log(Config.chVoiceLog.channel)
}

async function Run(): Promise<void> {
    const guild = Bot.guilds.cache.get(Config.chVoiceLog.guild)
    channel = await guild.channels.fetch(Config.chVoiceLog.channel) as TextChannel
    Bot.on('voiceStateUpdate', checkState)
}

async function checkState(oldMember: VoiceState, newMember: VoiceState) {
    try {
        const oldVoice = oldMember.channel
        const newVoice = newMember.channel
        const username = newMember.member.user.username
        let message: string
        if (oldVoice && newVoice && oldVoice.id != newVoice.id) {
            message = `${username} :: ${oldVoice.name} => ${newVoice.name}`
        } else if (!oldVoice && newVoice) {
            message = `${username} :: Joined ${newVoice.name}`
        } else if (oldVoice && !newVoice) {
            message = `${username} :: Left ${oldVoice.name}`
        } else { return }
        logger.info(message)
        channel.send(message)
        //await (await client.channels.fetch(voicelog) as TextChannel).send(message)
    } catch (err) {
        logger.error("Voice - Unknown error")
        logger.error(err)
    }
}

export default { Load: Load, Run: Run } as IModule