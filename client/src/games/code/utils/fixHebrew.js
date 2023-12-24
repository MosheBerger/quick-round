import contains_heb from "./containsHebrewCheck";

function fixHeb(str){
    
    if (contains_heb(str)) {
        return str.split('').reverse().join('')
    }
    return str
}

export default fixHeb