/* eslint-disable no-console */
import { Client, MessageEmbedOptions, TextChannel } from 'discord.js'
import { get } from 'request-promise-native'
import { validate, parse } from 'fast-xml-parser'
import { load } from 'cheerio'
import { DateTime } from 'luxon'

import { Bot } from '..'

const rss = 'http://minecrafting.ru/rss/ccs/1c1-%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8/'

let latest = 'e8b1cbd05f6e6a358a81dee52493dd06'

export default async function (client: Client): Promise<void> {
  const xmlData = await get(rss)
  if (!validate(xmlData)) { return }
  const jsonObj = parse(xmlData)
  //let news = []
  for (const item of jsonObj.rss.channel.item) {
    if (item.guid == latest) {
      latest = item.guid;
      break
    }
    console.log(item.title)
    console.log(decodeURI(item.link))
    console.log(item.pubDate)
    console.log(item.guid)

    const $ = load(await get(item.link))
    const image = $('.ipsBox_post', '#content').find('.bbc_img').first().attr('src')

    const embed: MessageEmbedOptions = {

      "author": {
        "name": '',
        "url": '',
        "iconURL": ''
      },
      "title": 'Новость с сайта',
      "url": decodeURI(item.link),
      "description": `[${item.title}](${decodeURI(item.link)})` || '',
      "image": {
        "url": image || ''
      },
      "color": 0xffffff,
      "footer": {
        "iconURL": '',
        "text": ''
      },
      "timestamp": DateTime.fromISO(item.pubDate).toJSDate()
    }
    await (await client.channels.fetch(Bot.config.channels.chNews) as TextChannel).send({ "embeds": [embed] })
  }
}