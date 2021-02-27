import { TextChannel } from "discord.js"
import fetch from "node-fetch"
import $ from "cheerio"

import { BotClient } from '../index'
import { sleep, fixMD } from '../utils'
import { config } from '../lib/config'
import { savedState } from '../lib/state'

export let lastID = 0
let channel: TextChannel

export default function (): void {
    BotClient.on("ready", async () => {
        channel = await BotClient.channels.fetch(config.chServerLog) as TextChannel
        lastID = savedState.bansID
        checkBans()
    })
}

async function checkBans() {
    try {
        const bans: Ban[] = []
        const page = $.load(await (await fetch(config.bansPage)).text())
        page('.ban_item').each((index, element) => {
            bans.push(parseBan(element))
            if (index == 9) { return false }
        })
        //TODO Check for decrese of lastID        
        bans.filter(b => b.ban_number > lastID)
            .forEach(async (ban) => {
                await reportBan(ban)
            })
        lastID = bans[0].ban_number
        await sleep(5 * 60 * 1000)
    } catch {
        await sleep(60 * 60 * 1000)
    } finally {
        checkBans()
    }
}

function parseBan(e: cheerio.Element): Ban {
    return {
        ban_number: parseInt($(e).find('.ban_number').text()),
        ban_player: $(e).find('.ban_player_name').text(),
        ban_date: new Date($(e).find('.ban_date_value').attr('title')),
        ban_reason: $(e).find('.ban_reason_value').text(),
        ban_operator: $(e).find('.ban_operator_value').text(),
        ban_second: $(e).find('.ban_second_value').text() == 'да'
    }
}

async function reportBan(b: Ban) {
    const embed = {
        //"author": { "name": user.username, "icon_url": user.avatarURL },
        "color": b.ban_second ? 4289797 : 13632027,
        "description": `Игрок **${fixMD(b.ban_player)}** был заблокирован с причиной "**${b.ban_reason}**"`,
        "footer": { "text": b.ban_operator },
        "timestamp": b.ban_date.getTime()
    }
    await channel.send({ "embed": embed })
}

interface Ban {
    ban_number: number,
    ban_player: string,
    ban_date: Date,
    ban_reason: string,
    ban_operator: string,
    ban_second: boolean
} 