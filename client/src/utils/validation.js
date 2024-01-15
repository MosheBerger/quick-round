function isValid(value = '', type = 'string') {

    if (!value) { return false }

    switch (type) {

        case 'name':
            return (
                value.length >= 4
                && value.length <= 20
            )

        case 'password':
            return (
                value.length >= 8
                && value.length <= 20
            )

        case 'email':
            return (
                value.includes('@')
            )

        default:
            break;
    }

}

const validation = {
    isValid,
    type: {
        name: 'name',
        password: 'password',
        email: 'email',
    }
}

module.exports = validation