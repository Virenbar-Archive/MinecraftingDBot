import { IBot } from '..'
import IC from './interactionCreate'


export function RegisterEvents(Bot: IBot): void {
    Bot.on(IC.event, async i => { await IC.execute(i) })
}

export interface IEvent {
    name: string
    event: string
    disabled?: boolean
    execute(...args: unknown[]): Promise<void>
}