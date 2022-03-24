const { Client, Intents, MessageEmbed  } = require('discord.js')
const { fixMessage } = require('./uti')
const { updateMessage } = require('./embeds')
const { execute, stop, play } = require('./play-music')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.bfBXJUQgybnMCUSrWUmWpee7b7g'



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

        const serverQueue = queue.get(message.guild.id);

        if (fixMessage(message.content).replace('*','') === 'play') {
            execute(message, serverQueue);
            return;
          } else if (fixMessage(message.content).replace('*','') === 'skip') {
            skip(message, serverQueue);
            return;
          } else if (fixMessage(message.content).replace('*','') === 'stop') {
            stop(message, serverQueue);
            return;
          } else {
            message.channel.send("You need to enter a valid command!");
          }

    }


})