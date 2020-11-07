/* eslint-disable @typescript-eslint/no-unused-vars */
/* 
Resends message to everyone in same voice channel as sender. 
*/
import { Client, MessageEmbed, MessageEmbedOptions, VoiceChannel } from "discord.js"
import { prefix } from './../config.json'
import { BotClient } from './../index'

export default function (): void {
  BotClient.on('message', async message => {
    try {
      if (message.channel.type != 'dm' || message.content.startsWith(prefix) || message.author.bot) return
      const user = message.author
      let userVoice: VoiceChannel
      const userGuilds = message.author.client.guilds.cache
      //console.log(userGuilds)
      for (const [id, guild] of userGuilds) {
        //console.log(guild.member(message.author))
        if (guild.member(message.author)) {
          userVoice = guild.member(message.author).voice.channel
        }
        if (userVoice) break
      }
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
          "files": message.attachments.map(attachment => {
            return attachment.url
          }),
          //embed.color
          "footer": { "text": userVoice.name },
          "timestamp": message.createdTimestamp
        }
        for (const [id, member] of userVoice.members) {
          if (member.id != user.id) {
            await member.send({ "embed": embed })
          }
        }
        await message.react('✅')
      }
    } catch (err) {
      console.log("Ошибка при отправке эхо\n" + err)
    }
  })
}