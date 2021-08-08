/*
Reactions
*/
/*
import { BotClient, logger } from './../index'
import { Config } from '../lib/config';

const BadUsers = new Set(Config.badUsers)
export default function (): void {
    BotClient.on('messageReactionAdd', async (react, user) => {
        try {
            if (!react.message.author.bot && react.count == 1) {
                //const users = await react.users.fetch()
                if (BadUsers.has(user.id)) {
                    await react.remove()
                    logger.info(`Removed reaction`)
                }
            }
        } catch (err) {
            logger.error('Error processing reaction')
            logger.error(err)
        }
    })
}
*/