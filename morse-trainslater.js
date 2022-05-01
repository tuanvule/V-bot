module.exports = async function(message, op) {


    const morses = {
        ' ':' ',
        a: '·−/',
        b: '−···/',
        c: '−·−·/',
        d: '−··/',
        e: '·/',
        f: '··−·/',
        g: '−−·/',
        h: '····/',
        i: '··/',
        j: '·−−−/',
        k: '−·−/',
        l: '·−··/',
        m: '−−/',
        n: '−·/',
        o: '−−−/',
        p: '·−−·/',
        q: '−−·−/',
        r: '·−·/',
        s: '···/',
        t: '−/',
        u: '··−/',
        v: '···−/',
        w: '·−−/',
        x: '−··−/',
        y: '−·−−/',
        z: '−−··/',
        0: '−−−−−/',
        1: '·−−−−/',
        2: '··−−−/',
        3: '···−−/',
        4: '····−/',
        5: '·····/',
        6: '−····/',
        7: '−−···/',
        8: '−−−··/',
        9: '−−−−·/',
    }

    const texts = {
        '' : ' ',
        '·−' : 'a',
        '−···' : 'b',
        '−·−·' : 'c',
        '−··' : 'd',
        '·' : 'e',
        '··−·' : 'f',
        '−−·' : 'g',
        '····' : 'h',
        '··' : 'i',
        '·−−−' : 'j',
        '−·−' : 'k',
        '·−··' : 'l',
        '−−' : 'm',
        '−·' : 'n',
        '−−−' : 'o',
        '·−−·' : 'p',
        '−−·−' : 'q',
        '·−·' : 'r',
        '···' : 's',
        '−' : 't',
        '··−' : 'u',
        '···−' : 'v',
        '·−−' : 'w',
        '−··−' : 'x',
        '−·−−' : 'y',
        '−−··' : 'z',
        '−−−−−' : '0',
        '·−−−−' : '1',
        '··−−−' : '2',
        '···−−' : '3',
        '····−' : '4',
        '·····' : '5',
        '−····' : '6',
        '−−···' : '7',
        '−−−··' : '8',
        '−−−−·' : '9',
    }

    switch (op) {
        case 'morse to text':
            const args = message.content.split(' ');
            args.shift()
        
            let newArgs = []
        
            let morseMes = []
            let res = ''

            args.forEach((arg, i) => {
                newArgs.push(arg, ' ')
            })
            newArgs.forEach((ele) => {
                if(ele != ' ') {
                    morseMes = [...morseMes, ...ele.split('/')]
                }
            })
            morseMes.forEach((morseCode) => {
                res += texts[morseCode]
            })
            message.reply(res)
            break;
        case 'text to morse':
            const args2 = message.content.split(' ');
            args2.shift()
            const newArgs2 = args2.join(' ').split('')
            console.log(newArgs2)
            let res2 = ''
            newArgs2.forEach((arg) => {
                res2 += morses[arg]
            })
            message.reply(res2)
            break;
    }


}