import React, { useEffect } from 'react'

function AvatarSelector({ name }) {
    const startValue = 1

    useEffect(() => {
        const getData = async () => {
            for (let i = startValue; i < startValue + i; i++) {
                const res = await fetch(`sdf/${name + i}`)
            }

        }
        getData()
    }, [name])
    return (
        <div>AvatarSelector</div>
    )
}

export default AvatarSelector