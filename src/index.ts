import { slackbot } from 'botkit';

const config = require('../config.json');

console.log(process.env);

const controller = slackbot({ debug: true });
controller.spawn({ token: <string>process.env.EZ_BOT_TOKEN }).startRTM();

controller.on('rtm_close', function(bot, err) {
    console.log(err);
    bot.startRTM();
});

/**
 * List triggers
 */
controller.hears(
    '^triggered$',
    ['direct_message', 'ambient'],
    (bot, message) => {
        const triggers = Object.keys(config)
            .map(trigger => '`' + trigger + '`')
            .join(', ');

        bot.reply(message, triggers);
    }
);

/**
 * Respond to triggers
 */
controller.hears('.*', ['direct_message', 'ambient'], (bot, message) => {
    Object.keys(config).forEach(trigger => {
        if (typeof message.text !== 'string') {
            return;
        }

        const escaped = trigger.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regEx = new RegExp(`^${escaped}$`);

        if (regEx.test(message.text)) {
            bot.reply(message, config[trigger]);
            return;
        }
    });
});
