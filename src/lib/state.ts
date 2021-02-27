import fs from "fs"
import { logger } from '../index'
import { lastID } from '../modules/bans'
import { sleep } from "../utils"

const file = "state.json"
export let savedState: State

export function loadState(auto = true): void {
    if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf8')
        savedState = JSON.parse(raw)
    } else {
        savedState = { bansID: 0, rssID: '' }
    }
    if (auto) { autoSave() }
}

async function autoSave() {
    try {
        await sleep(30 * 60 * 1000)
        saveState()
    } catch {
        logger.error("Error saving state")
    } finally {
        autoSave()
    }
}

function saveState() {
    savedState.bansID = lastID
    const data = JSON.stringify(savedState)
    fs.writeFileSync(file, data)
}

interface State {
    bansID: number,
    rssID: string
}