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
    },

    RBSGAME() {
        return embed = new MessageEmbed()
        .setColor('#ed2f21')
        .setTitle('kéo búa bao')
        .addFields(
            { name: 'cách chơi', value: '------------' },
            { name: '--1--', value: 'nhắn 1 trong 3 chữ: kéo, búa, bao' },
            { name: 'lệnh bắt đầu:', value: '*bắt đầu' },
        )
    },

    playList(songs) {
        return embed = new MessageEmbed()
        .setColor('#ed2f21')
        .setTitle('danh sách nhạc')
        .addFields(
            [...songs].map((song, index) => {
                return {
                    name: `${index + 1}`,
                    value: song.title
                }
            })
            // { name: 'cách chơi', value: '------------' },
            // { name: '--1--', value: 'nhắn 1 trong 3 chữ: kéo, búa, bao' },
            // { name: 'lệnh bắt đầu:', value: '*bắt đầu' },
        )
    }

}