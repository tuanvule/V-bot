module.exports = {
    playRPS(message) {
        const args = message.content.slice(1).trim().split(/ +/g);
        const acceptedReplies = ['búa', 'bao', 'kéo'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];
        
        console.log(args)

        const choice = args[1];
        if (!choice) return message.channel.send(`cách chơi: \`*rps <kéo|bao|búa>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`chỉ được dùng: \`${acceptedReplies.join(', ')}\`1`);
        
        console.log('Bot :', result);
        message.reply(`Bot : ${result}`)
        if (result === choice) return message.reply("huề");
        
        
        switch (choice) {
            case 'búa': {
                if (result === 'bao') return message.reply('t thắng:)! --hơi non--');
                else return message.reply('bạn thắng:(');
            }
            case 'bao': {
                if (result === 'kéo') return message.reply('t thắng:)! --hơi non--');
                else return message.reply('bạn thắng:(');        
            }
            case 'kéo': {
                if (result === 'búa') return message.reply('t thắng:)! --hơi non--');
                else return message.reply('bạn thắng:(');
            }
            default: {
                console.log(args)
                return message.channel.send(`chỉ được dùng: \`${acceptedReplies.join(', ')}\``);
            }
        }
    
    }
}