const { Client, Intents, MessageEmbed  } = require('discord.js')
const { fixMessage } = require('./uti')

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]} )

// const token = 'OTU1MDUyNDMzNjk0OTQ5NDM3.YjcD5A.bfBXJUQgybnMCUSrWUmWpee7b7g'

const embed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('cập nhât mới')
	.addFields(
		{ name: '1', value: 'thêm ký tự lệnh' },
		{ name: '2', value: 'thêm lọc chữ' },
	)

client.login(process.env.token)
client.on('ready', () => {
    console.log(client.user.tag + ' đã online' )
})

client.on('messageCreate', message => {

    if(message.content.includes('*')) {
        
        if(fixMessage(message.content).replace('*','') === 'xem cập nhập') {
            message.channel.send(embed);
        }
    
        if(fixMessage(message.content).replace('*','') === 'ping') {
            message.channel.send({content: 'ping cái đb'})
        }    

    }


})