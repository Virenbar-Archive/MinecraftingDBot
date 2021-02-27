/* eslint-disable no-console */
import { TextChannel, VoiceState } from "discord.js"

import { BotClient, logger } from '../index'
import { config } from '../lib/config'
let channel: TextChannel

export default function (): void {
  BotClient.on('ready', async () => {
    channel = await BotClient.channels.fetch(config.chVoiceLog) as TextChannel
    BotClient.on('voiceStateUpdate', checkState)
  })
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
