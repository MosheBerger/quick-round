function isValid(value = '', type = 'string') {

    if (!value) { return false }

    switch (type) {

        case 'username':
            return (
                value.length > 4
                && value.length < 20
            )

        case 'password':
            return (
                value.length > 8
                && value.length < 20
            )


        default:
            break;
    }

}

const validation = {
    isValid,
    t: {
        username: 'username',
        password: 'password',
    }
}

module.exports = validation