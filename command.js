module.exports = {
    command(client, messages, callback) {
        if(typeof messages === 'string') {
            messages = [messages]
        
        }

        client.on('messageCreate' , res => {
            const { content } = res

            messages.forEach(message => {
                const command = `*${message}`

                if(content.startsWith(`${command} `) || content === command) {
                    callback(res)
                }
            })
        })
    }
}