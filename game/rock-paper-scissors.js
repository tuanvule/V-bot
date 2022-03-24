module.exports = {
    playRPS(message) {
        const result = [
            'kéo',
            'búa',
            'bao'
        ]

        const random = Math.round(Math.random() * 3)
        let achievement

        if (message === result[random]) {
            achievement = 'hòa'
        } else {
            achievement = 'thắng thua thằng vũ chưa làm:) (do lười)'
        } 

        return `
            ${result[random]}
            \n
            --${achievement}--
        `
    }
}