import { useNavigate } from "react-router-dom"

function useEnterToRoom() {

    const navigate = useNavigate()

    const handleEnter = async (e, roomId) => {
        e.preventDefault()
        navigate(`/room/${roomId}/play/`)
    }

    const enter = (id) => { return (e) => handleEnter(e, id) }
    return enter
}
export default useEnterToRoom