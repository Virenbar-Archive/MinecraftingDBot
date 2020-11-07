/**
 * Sleep for ms
 * @param ms milliseconds
 */
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Escape all underscores
 */
export function nodash(str: string) {
    //Underscore escape
    return str.replace(/_/g, '\\_')
}