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
    const [loading, setLoading] = useState(true)

    // console.log('errorr?');
    useEffect(() => {

        async function fetchData() {
            try {
                const res = await fetch(URL)
                const data = await res.json()
                setState(data)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [URL])

    return [state, loading, setLoading, setState]
}


function useNow(URL, setState) {
    const [loading, setLoading] = useState(true)

    async function getData() {
        try {
            const res = await fetch(URL)
            const data = await res.json()

            if (setState) {
                setState(data)
                return
            }

        } catch (error) {
            console.log('error', error);

        } finally {
            setLoading(false)
        }
    }
    getData()
    
    return [loading]
}

const fetcher = {
    useNow,
    useInEffect,
    useStateAndEffect,
}

export default fetcher