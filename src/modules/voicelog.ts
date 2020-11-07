/* eslint-disable no-console */
import { TextChannel, VoiceState } from "discord.js"

import { BotClient } from '../index'
import { voicelog } from './../config.json'
let channel: TextChannel

export default function (): void {
  BotClient.on('ready', async () => {
    channel = await BotClient.channels.fetch(voicelog) as TextChannel
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
      message = username + ' :: ' + oldVoice.name + ' => ' + newVoice.name
    } else if (!oldVoice && newVoice) {
      message = username + ' :: Joined ' + newVoice.name
    } else if (oldVoice && !newVoice) {
      message = username + ' :: Left ' + oldVoice.name
    } else { return }
    console.log(message)
    channel.send(message)
    //await (await client.channels.fetch(voicelog) as TextChannel).send(message)
  } catch (err) {
    console.log("Прослушка не удалась\n" + err)
  }
}
