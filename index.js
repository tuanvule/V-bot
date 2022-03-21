const { Client, Intents } = require('discord.js')
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

client.login('OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.YCeMqWw4XLoEzD-46pUjrl8eZ0A')

client.on('ready', () => {
    console.log(client.user.tag + ' đã online')
})

client.on('message', message => {

    if(message.content === 'ping') {
        message.channel.send({content: 'bớt ping đi'})
    }
})