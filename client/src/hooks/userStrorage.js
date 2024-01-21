
const key = 'quick-round-data'

function get() {
    const stringedData = localStorage.getItem(key)
    return JSON.parse(stringedData) || undefined
}

function set(data) {
    const stringedData = JSON.stringify(data)
    localStorage.setItem(key, stringedData)
}

function useGet() {
    return get()
}

function remove() {
    localStorage.removeItem(key)
}


const userStorage = {
    get,
    set,
    useGet,
    remove,
}

export default userStorage