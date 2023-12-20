const { useEffect } = require("react");


async function useFetch(URL,setState){
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
    }, [setState])
}

export default useFetch