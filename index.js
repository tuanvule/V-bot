const { Client, Intents, MessageEmbed  } = require('discord.js')
const { fixMessage } = require('./uti')
const { updateMessage } = require('./embeds')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.bfBXJUQgybnMCUSrWUmWpee7b7g'



client.login(process.env.token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )
})

client.on('messageCreate', message => {

    if(message.content.includes('*')) {
        
        if(fixMessage(message.content).replace('*','') === 'xem cập nhập') {
            message.channel.send({embeds: [updateMessage()]})
        }
    
        if(fixMessage(message.content).replace('*','') === 'ping') {
            message.channel.send({content: 'ping cái đb'})
        }    

    }


})