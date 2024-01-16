async function fetchNow(URL, setState, setLoading) {
    if(setLoading){
        setLoading(true)
    }
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
        if(setLoading){
            setLoading(false)
        }
    }
}
export default fetchNow
