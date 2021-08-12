import fs from "fs"
import { logger } from '..'
import { sleep } from "../utils"

const file = "state.json"
export let State: IState

export function loadState(auto = true): void {
    if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf8')
        State = JSON.parse(raw)
    } else {
        State = { bansID: 0, rssID: '' }
    }
    if (auto) { autoSave() }
}

async function autoSave(): Promise<void> {
    for (; ;) {
        try {
            await sleep(30 * 60 * 1000)
            saveState()
        } catch {
            logger.error("Error saving state")
        }
    }
}

export function saveState(): void {
    const data = JSON.stringify(State)
    fs.writeFileSync(file, data)
}

interface IState {
    bansID: number,
    rssID: string
}