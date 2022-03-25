module.exports = {
    command(client, messages, callback) {
        if(messages === 'string') {
            messages = [messages]
        }

        client.on('message' , message => {
            const { content }= message

            messages.forEach(message => {
                const command = `*${message}`

                if(content.startsWith(`${command}`) || content === message) {
                    callback(message)
                }
            })
        })
    }
}