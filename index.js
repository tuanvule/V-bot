const { Client, Intents, MessageEmbed  } = require('discord.js')
const { command } = require('./command')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')
const { execute, stop, play, queue } = require('./play-music')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.7fS4SfEy9CouhZ9kkfH7tyueFP8'

let isPlayingRBS
let isStart

const commandToReply = {
    'command name': 'bot message',
    'random': 'some text',
    'bot': 'random text',
    'testing': 'text',
};

// client.login('OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.7fS4SfEy9CouhZ9kkfH7tyueFP8')

client.login(process.env.token)

client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )

    command(client, ['ping','test'], message => {
        message.channel.send({ content: 'ping cái đb' })
    })

    command(client, ['show update','xem cập nhập'], message => {
        message.channel.send({embeds: [updateMessage()]})
    })

    command(client, 'rps', message => {
        playRPS(message)
    })
})