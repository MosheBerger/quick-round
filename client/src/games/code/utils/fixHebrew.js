import contains_heb from "./containsHebrewCheck";

function fixHeb(str = '', wordsInRow = 5) {

    if (contains_heb(str)) {
        // מוריד שורה עם הסטרינג ארוך 
        const words = str.split(' ')
        const sentence = []
        if (words.length > wordsInRow) {
            for (let i = 1; i < words.length; i++) {
                if (i % wordsInRow === 0) {
                    words.splice(i, 0, '\n')
                }
            }
            const rows = words.join(' ').split('\n')
            for (let row of rows) {
                sentence.unshift(row)
            }
            str = sentence.join('\n')

        }

        return str.split('').reverse().join('')
    }
    return str
}

export default fixHeb