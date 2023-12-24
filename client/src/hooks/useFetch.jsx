const { useEffect } = require("react");


async function useInEffect(URL, setState) {
    useEffect(() => {

        async function fetchData() {
            try {
                const res = await fetch(URL)
                const data = await res.json()
                setState(data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [URL, setState])
}
async function useNow(URL, setState) {
    try {
        const res = await fetch(URL)
        const data = await res.json()
        setState(data)

    } catch (error) {
        return error
    }

}

const fetcher = {
    useInEffect,
    useNow,
}

export default fetcher