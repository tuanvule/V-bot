const { Client, Intents } = require('discord.js')
const { token } = require('./config.json')
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

client.login(token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online')
})

client.on('message', message => {

    if(message.content === 'ping') {
        message.channel.send({content: 'bớt ping đi'})
    }
})