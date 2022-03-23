const {  MessageEmbed  } = require('discord.js')

module.exports = {
    updateMessage() {
        return embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('cập nhât mới')
            .addFields(
            { name: '1', value: 'thêm ký tự lệnh' },
            { name: '2', value: 'thêm lọc chữ' },
	)
    }
}