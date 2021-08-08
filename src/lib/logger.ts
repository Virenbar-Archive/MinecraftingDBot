import { configure, getLogger } from "log4js";
import { Bot } from "..";

export function loadLogger(): void {
    configure({
        appenders: {
            debugFile: { type: "file", filename: "logs/debug.log", maxLogSize: 1024 * 1024 * 10, backups: 5, compress: true },
            errorFile: { type: "file", filename: "logs/error.log", maxLogSize: 1024 * 1024 * 10, backups: 5, compress: true },
            console: { type: "console", layout: { type: "colored" } },
            errors: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
        },
        categories: {
            default: { appenders: ["console", "debugFile", "errors"], level: "debug" }
        }
    });
    Bot.logger = getLogger("DBot")
}

export default { loadLogger }