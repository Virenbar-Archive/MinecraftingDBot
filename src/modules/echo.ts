/* eslint-disable @typescript-eslint/no-unused-vars */
/* 
Resends message to everyone in same voice channel as sender. 
*/
import { Message, MessageEmbedOptions, StageChannel, VoiceChannel } from "discord.js"

import { IModule } from "."
import { IBot } from ".."

let Bot: IBot
function Load(client: IBot): void { Bot = client }

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
      if (message.channel.type != 'DM' || message.author.bot) return
      await EchoMessage(message)
    } catch (err) {
      Bot.logger.error("Echo - Ошибка при отправке эхо")
      Bot.logger.error(err)
    }
  })
}

const Module: IModule = { Load: Load, Run: Run }
export default Module
