const { Client, Intents, MessageEmbed  } = require('discord.js')
const { command } = require('./command')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')
const { execute, stop, play, queue } = require('./play-music')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.bfBXJUQgybnMCUSrWUmWpee7b7g'

let isPlayingRBS
let isStart

client.login(process.env.token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )

    command(client, ['ping','test'], message => {
        message.channel.send({ content: 'ping cái đb' })
    })
})

// client.on('message', async message => {

//     if(message.content.includes('*')) {

//         console.log(message)
        
//         if(fixMessage(message.content).replace('*','') === 'xem cập nhập') {
//             message.channel.send({embeds: [updateMessage()]})
//         }
    
//         if(fixMessage(message.content).replace('*','') === 'ping') {
//             message.channel.send({content: 'ping cái đb'})
//         }    
        
//     }

// })