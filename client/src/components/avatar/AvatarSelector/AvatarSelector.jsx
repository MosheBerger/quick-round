import React, { useState } from 'react'
import Avatar from '../Avatar'
import COLORS from './colors'
import ColorsSelector from './ColorSelector'


const defaultValue = [1, 2, 3]

function AvatarSelector({ name, setAvatar, close }) {
    const [seeds, setSeeds] = useState(defaultValue)
    const [imageSeed, chooseImage] = useState(1)
    const [colorIndex, setColorIndex] = useState(0)

    const updateSeeds = (e, num) => {
        e.preventDefault()
        setSeeds(prev => prev.map(n => n + 3 * num))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAvatar({ seedName: name + imageSeed, color: COLORS[colorIndex] })
        close()
    }


    return (<div style={{ minWidth: 400, }}>
        <h4 className='unmargin'> דמות </h4>
        <article className='flex unmargin' style={{overflow:'hidden'}}>
            <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, -1)}> ▶️ </a>
            {seeds.map(s => (
                <Avatar
                    onClick={() => chooseImage(s)}
                    key={s} seed={s} seedName={name + s}
                    color={'#ffffff'}
                    imageSeed={imageSeed}
                />
            ))}
            <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, 1)}> ◀️ </a>
        </article>


        <ColorsSelector setColorIndex={setColorIndex} colorIndex={colorIndex} name={name} imageSeed={imageSeed} />

        <button type="submit" onClick={handleSubmit}>
            <Avatar seedName={name + imageSeed} color={COLORS[colorIndex]} />
            <br />
            שמירה
        </button>
    </div>)
}



export default AvatarSelector