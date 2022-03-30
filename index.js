const { Client, Intents, MessageEmbed  } = require('discord.js')
const { command } = require('./command')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')
const { MongoClient } = require('mongodb')
// const { joinVoiceChannel } = require("@discordjs/voice")
// const { execute, stop, play, queue } = require('./play-music')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const uri = "localhost:27017";

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.7fS4SfEy9CouhZ9kkfH7tyueFP8'

// const player = new Player(client, {
//     leaveOnEmpty: false,
// });
// client.player = player;

client.login('OTU3OTgxODg4MzI3MzUyMzcw.YkGsKA.pmSUWFeKMu05WvjI47j9Z1DsWhs')

// client.login(process.env.token)

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

    command(client, 'thông báo', message => {
        message.channel.send({ content: 'tôi sẽ không được cập nhập nữa' })
    })

})
