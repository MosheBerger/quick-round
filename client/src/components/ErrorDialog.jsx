import React, { useEffect, useRef } from 'react'

function ErrorDialog({ message, setErrorMessage }) {

    const TOid = useRef(null)

    useEffect(() => {
        if (message === null) {return}
        console.log('set');
        TOid.current = setTimeout(() => {
            setErrorMessage(null)
            console.log('timeout');
        }, 2500)
        return () => {
            clearTimeout(TOid.current)
            console.log('clear');
        }
    }, [message, setErrorMessage])

    if (!message){
        return<></>
    }    
    return (
        <div className='error' style={{ background: '#d32f2f', color: 'white', padding: '2%' }}>
            <b>{message}</b>
        </div>
    )
}

export default ErrorDialog