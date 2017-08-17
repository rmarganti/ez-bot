import * as dotenv from 'dotenv';
import { slackbot } from 'botkit';

import config from '../config/users';
import { messageInterface, userInterface } from './types';

dotenv.config();

const controller = slackbot({ debug: false });
controller.spawn({ token: process.env.TOKEN }).startRTM();

let users = new Map<string, userInterface>();

controller.hears('.*', ['direct_message', 'ambient'], (bot: any, message: messageInterface) => {
    if (users.has(message.user)) {
        addReaction(bot, message, users.get(message.user));
        return;
    }

    bot.api.users.info({ user: message.user }, (err: Error, response: any) => {
        const user = response.user;
        users.set(message.user, user);
        addReaction(bot, message, user);
    });
});

function addReaction(bot: any, message: messageInterface, user: userInterface) {
    if (!config[user.name]) {
        console.error('No emoji configured for user:', user.name);
        return;
    }

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: config[user.name],
    }, (err: Error) => {
        if (err) {
            bot.botkit.log('Failed to send emoji:', err);
        }
    });
}
