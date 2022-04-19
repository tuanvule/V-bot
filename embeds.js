const {  MessageEmbed  } = require('discord.js')

module.exports = {
    updateMessage() {
        return embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('cập nhât mới')
            .addFields(
                { name: '1', value: 'thêm ký tự lệnh' },
                { name: '2', value: 'thêm lọc chữ' },            
                { name: '\u200B', value: '\u200B' },
                { name: 'các câu lệnh để chơi nhạc', value: '-------------------------------------------------------------------------------' },
                { name: '*play', value: 'EX: *play https://www.youtube.com/watch?v=8ofCZObsnOo' },
                { name: '*stop', value: 'EX: *stop' },
                { name: 'các lệnh dành cho songlist', value: '-------------------------------------------------------------------------------' },
                { name: '*songlist create', value: 'EX: *songlist create' },
                { name: '*songlist add', value: 'EX: *songlist add https://www.youtube.com/watch?v=8ofCZObsnOo' },
                { name: '*songlist start [nhập stt bài hát]', value: 'EX: *songlist start \n lệnh này dùng để bắt đầu phát các bài hát trong songlist' },
                { name: '*songlist next', value: 'EX: *songlist next' },
                { name: '*songlist back', value: 'EX: *songlist back' },
                { name: '*songlist show', value: 'EX: *songlist show' },
                { name: '*songlist remove', value: 'EX: *songlist remove 1 \n số < 1 > là thứ tự của bài hát trong songlist' },

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