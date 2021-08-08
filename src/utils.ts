/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * Sleep for ms
 * @param ms milliseconds
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Escape markdown chars
 */
export function fixMD(str: string): string {
    return str.replace(/_/g, '\\_').replace(/\*/g, '\\*')
}

/**
 * Format bytes to string
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {number} bytes
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 
 * @returns {string} **Label:** Text
 */
export function labelString(label: string, text: string): string {
    return `**${label}:** ` + text
}

/**
 * Removes indent after newlines
 */
export function remIndent(text: string): string {
    return text.replace(/\n\s+/gm, "\n")
}