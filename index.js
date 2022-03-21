const { Client, Intents } = require('discord.js')
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.fUIZa-NsLpPVe1aD1Rtok3ExypA'

client.login(token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )
})

client.on('message', message => {

    if(message.content === 'ping') {
        message.channel.send({content: 'ping cài đb'})
    }    
})