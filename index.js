const { Client, Intents, MessageEmbed  } = require('discord.js')
const { command } = require('./command')
const { updateMessage, RBSGAME } = require('./embeds')
const { playRPS } = require('./game/rock-paper-scissors')

const { execute, stop, skip, queue, unstop, playList} = require('./music')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.login('OTU3OTgxODg4MzI3MzUyMzcw.YkGsKA.4QeDaKXtPmdADL9_xMF3SpAFj0g')

// client.login(process.env.token)

let i = 0

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
    command(client, 'play', message => {
        const serverQueue = queue.get(message.guild.id);
        execute(message, serverQueue);
    })
    command(client, 'songlist', message => {
        const serverQueue = queue.get(message.guild.id);
        // console.log(message.content.split(' ')[1])
        switch (message.content.split(' ')[1]) {
            case 'create':
                playList.create(message, serverQueue)
                break;
            case 'add':
                playList.add(message, serverQueue)
                break;
            case 'remove':
                playList.remove(message, serverQueue, message.content.split(' ')[2] ? message.content.split(' ')[2] : 1)
                break;
            case 'start':
                playList.play(message, serverQueue)
                break;
            case 'show':
                playList.showPlayList(message, serverQueue)
                break;
            case 'next':
                i++
                playList.next(message, serverQueue, i);
                break;
            case 'back':
                i--
                playList.back(message, serverQueue, i);
                break;
            default:
                message.channel.send({ content: 'lệnh không hợp lệ' })
        }
    })
    command(client, 'stop', message => {
        const serverQueue = queue.get(message.guild.id);
        stop(message, serverQueue);
    })
    command(client, 'continue', message => {
        const serverQueue = queue.get(message.guild.id);
        unstop(message, serverQueue);
    })


    // command(client, 'play', message => {
    //     joinVoiceChannel({
    //         channelId: message.member.voice.channel.id,
    //         guildId: message.guild.id,
    //         adapterCreator: message.guild.voiceAdapterCreator
    //     })
    // })

})

// client.on("message", async message => {
//     if (message.author.bot) return;
//     if (!message.content.startsWith('*')) return;
  
  
//     if (message.content.startsWith(`*play`)) {
//       execute(message, serverQueue);
//       return;
//     } else if (message.content.startsWith(`*skip`)) {
//       skip(message, serverQueue);
//       return;
//     } else if (message.content.startsWith(`*stop`)) {
//       stop(message, serverQueue);
//       return;
//     } else {
//       message.channel.send("You need to enter a valid command!");
//     }
//     // console.log(message.guild.id.connection)

//   });
  