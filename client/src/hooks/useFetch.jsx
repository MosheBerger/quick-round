const { useEffect } = require("react");


async function useInEffect(URL,setState){
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
    }, [URL,setState])
}

const fetcher={
    useInEffect
}

export default fetcher