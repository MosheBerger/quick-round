import React from 'react'

export default function Avatar({ seedName, seed, imageSeed, color, onClick }) {

    const props = {
        src: `https://api.dicebear.com/7.x/lorelei-neutral/svg?backgroundColor=transparent&scale=120&seed=${seedName}`,
        style: { height: '10%', width: '10%', outline: seed === imageSeed ? 'black solid 5px' : 'black solid 3px', borderRadius: '50%', background: color }
    }
    
    return (
        <img onClick={onClick} {...props} alt='' />
    )
}
