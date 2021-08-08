import { IBot } from '..'
import IC from './interactionCreate'
import CR from './clientReady';

export function RegisterEvents(Bot: IBot): void {
    Bot.on(IC.event, async i => { await IC.execute(i) })
    Bot.on(CR.event, async () => { await CR.execute() })
}

export interface IEvent {
    name: string
    event: string
    disabled?: boolean
    execute(...args: unknown[]): Promise<void>
}

export default { RegisterEvents }