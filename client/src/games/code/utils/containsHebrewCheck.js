function contains_heb(str) {
    return (/[\u0590-\u05FF]/).test(str);
}

export default contains_heb