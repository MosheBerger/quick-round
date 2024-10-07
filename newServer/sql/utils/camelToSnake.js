

function camelToSnake(str = '') {
    const letters = str.split('')

    for (let i = 1; i < letters.length; i++) {
        const curLetter = letters[i]
        if (curLetter === curLetter.toUpperCase()) {
            letters.splice(i, 1, '_' + curLetter.toLowerCase())
            i++
        }
    }
    return letters.join('')
}


function snakeToCamel(str = '') {

    const words = str.split('_')

    const camelWords = words.map((word, i) => {

        if (i === 0) { return word }

        const letters = word.split('')
        letters[0] = letters[0].toUpperCase()
        return letters.join('')
    })

    return camelWords.join('')
}

// const res = snakeToCamel('hi_how_are_you?')
// console.log(res);

// const res2 = camelToSnake('hiHowAreYou?')
// console.log(res2);

const convertString ={
    camelToSnake,
    snakeToCamel
}

module.exports = convertString