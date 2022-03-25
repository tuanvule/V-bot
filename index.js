const { Client, Intents, MessageEmbed  } = require('discord.js')
const { fixMessage } = require('./uti')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')
const { execute, stop, play, queue } = require('./play-music')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.bfBXJUQgybnMCUSrWUmWpee7b7g'

let isPlayingRBS

client.login(process.env.token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )
})

client.on('messageCreate', async message => {

    if(message.content.includes('*')) {

        console.log(message)
        
        if(fixMessage(message.content).replace('*','') === 'xem cập nhập') {
            message.channel.send({embeds: [updateMessage()]})
        }
    
        if(fixMessage(message.content).replace('*','') === 'ping') {
            message.channel.send({content: 'ping cái đb'})
        }    

        if(fixMessage(message.content).replace('*','') === 'chơi kéo búa bao') {
            message.channel.send({embeds: [RBSGAME()]})
            isPlayingRBS = true
        }    

        if(isPlayingRBS) {

            if(fixMessage(message.content).replace('*','') === 'bắt đầu') {
                message.channel.send('hãy nhập lữa chọn của bạn vào bàn phím rồi gửi, tui sẽ random ra lữa chọn của tôi:)')
            }
    
            if(fixMessage(message.content).replace('*','') === 'kéo' || 'búa' || 'bao') {
                message.channel.send(playRPS(message.content.replace('*','')))
            }
            
        }
        
    }

})