/* eslint-disable @typescript-eslint/no-unused-vars */
/* 
Resends message to everyone in same voice channel as sender. 
*/
import { Client, Message, MessageEmbedOptions, StageChannel, VoiceChannel } from "discord.js"

import { Config } from '../lib/config'
import { IModule } from "."
import { logger } from ".."

let Bot: Client
function Load(client: Client): void { Bot = client }

async function EchoMessage(message: Message) {
  const user = message.author
  const userGuilds = message.author.client.guilds.cache
  //console.log(userGuilds)
  const userVoice = message.member.voice.channel
  if (!userVoice) return
  //console.log(userVoice.members)
  //embed = new Discord.RichEmbed()
  if (userVoice.members.size == 1) {
    await message.react('❎') //✅✔❎❌
    await message.reply("В канале нет других пользователей")
  } else {
    const embed: MessageEmbedOptions = {
      "author": {
        "name": user.username,
        "iconURL": user.avatar
      },
      "description": message.content,
      //embed.color
      "footer": { "text": userVoice.name },
      "timestamp": message.createdTimestamp
    }
    for (const [id, member] of userVoice.members) {
      if (member.id != user.id) {
        await member.send({
          "embeds": [embed],
          "files": message.attachments.map(attachment => {
            return { attachment: attachment.url }
          })
        })
      }
    }
    await message.react('✅')
  }
}

async function Run(): Promise<void> {
  Bot.on('messageCreate', async message => {
    try {
      if (message.channel.type != 'DM' || message.content.startsWith(Config.prefix) || message.author.bot) return
      await EchoMessage(message)
    } catch (err) {
      logger.error("Echo - Ошибка при отправке эхо")
      logger.error(err)
    }
  })
}

export default { Load: Load, Run: Run } as IModule