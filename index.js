const { Client, Intents, MessageEmbed  } = require('discord.js')
const { command } = require('./command')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

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

    command(client, 'thông báo', message => {
        message.channel.send({ content: 'tôi sẽ không được cập nhập nữa' })
    })

})
