import { useEffect } from "react"
import userStorage from "./userStorage"
import { useNavigate } from "react-router-dom"

function useReturnToHomeIfNoUser() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!userStorage.get()) {
            navigate('/')
        }
    })
}

export default useReturnToHomeIfNoUser