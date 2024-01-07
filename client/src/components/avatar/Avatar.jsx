import React from 'react'

export default function Avatar({ seedName, seed, imageSeed, color, onClick, outline, avatarSeed }) {
    
    if(avatarSeed){
        [seedName, color] = avatarSeed?.split(':')
    }

    const props = {
        src: `https://api.dicebear.com/7.x/lorelei-neutral/svg?backgroundColor=transparent&scale=120&seed=${seedName}`,
        style: {
            height: '10%',
            maxHeight: 60
            , outline: (outline || seed === imageSeed) ? '#904c08 solid 5px' : 'black solid 3px',
            borderRadius: '30%',
            background: color  || 'white'
        }
    }

    return (
        <img className='avatar' onClick={onClick} {...props} alt='' />
    )
}
