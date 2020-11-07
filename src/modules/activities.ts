import _ from "lodash"
import { BotClient } from '../index'
import { sleep } from '../utils';
import { max, online, players } from '../modules/playercountA';
const n = 2
let i = 0

export default function (): void {
    BotClient.on('ready', () => {
        sleep(5 * 1000)
        changeActivity()
    })
}
async function changeActivity() {
    try {
        switch (i++) {
            case 0:
                await BotClient.user.setActivity(`на ${online} из ${max} игроков`, { "type": "WATCHING" })
                break
            case 1: {
                const o = (players.length == 0) ? " в пустоту" : ` на ${_.sample(players)}`
                await BotClient.user.setActivity(o, { "type": "WATCHING" })
                //await BotClient.user.setActivity(`на часы(${BotClient.uptime})`, { "type": "WATCHING" })
                break
            }
            default:
                break
        }
        i = i % n
        await sleep(5 * 1000)
    } catch {
        await sleep(10 * 1000)
    } finally {
        changeActivity()
    }
}