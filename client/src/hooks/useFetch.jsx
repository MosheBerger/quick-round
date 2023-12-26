import { useState, useEffect } from 'react'


function useInEffect(URL, setState) {
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

function useStateAndEffect(URL, INITIAL_STATE) {

    const [state, setState] = useState(INITIAL_STATE)

    // console.log('errorr?');
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

    }, [URL])

    return [state, setState]
}


async function useNow(URL, setState) {
    try {
        const res = await fetch(URL)
        const data = await res.json()
        
        setState?.(data)

    } catch (error) {
        return error
    }

}

const fetcher = {
    useNow,
    useInEffect,
    useStateAndEffect,
}

export default fetcher