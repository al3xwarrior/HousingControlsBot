const mineflayer = require('mineflayer');

// Bot Configuration Options
const options = {
    host: 'hypixel.net',
    username: 'USERNAME',
    password: 'PASSWORD',
    auth: 'microsoft',
    version: '1.8.9',
};

// Create the bot using the options above
const bot = mineflayer.createBot(options);

function turnRight() {
    const bot_entity = bot.entity;
    const yaw = bot_entity.yaw;

    bot.look(yaw + 80, 0);
}
function turnLeft() {
    const bot_entity = bot.entity;
    const yaw = bot_entity.yaw;

    bot.look(yaw - 80, 0);
}

/*
    Here, the idea was for the bot to spawn in, wait 2 seconds and then
    attempt to join my party. This was so I could P WARP the bot into
    my house for testing
*/
bot.on('spawn', () => {
    console.log('Bot Spawned into a World');
    setTimeout(() => {
        console.log('Attempting to /p join');
        bot.chat('/p join Al3xWarrior');
    }, 2000);
});

/*
    Depending on the "title" sent to the player, the bot would do its
    specified action. This is how the bot would know to move forward,
    left, or right.
*/
bot.on('title', (title) => {
    if (title.includes('FORWARD')) {
        bot.setControlState('forward', true);

        setTimeout(() => {
            bot.setControlState('forward', false);
        }, 500);
    } else if (title.includes('LEFT')) {
        turnLeft();
    } else if (title.includes('RIGHT')) {
        turnRight();
    }
});
