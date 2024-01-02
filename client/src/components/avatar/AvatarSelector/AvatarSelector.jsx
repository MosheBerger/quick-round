import React, { useState } from 'react'
import Avatar from '../Avatar'
import COLORS from './colors'
import ColorsSelector from './ColorSelector'
// import useOuterDiv from '../../../hooks/useOuterDiv'


const defaultValue = [1, 2, 3, 4, 5]

function AvatarSelector({ name, setAvatar, close, children }) {
    const [seeds, setSeeds] = useState(defaultValue)
    const [imageSeed, chooseImage] = useState(1)
    const [colorIndex, setColorIndex] = useState(0)

    console.log('RENDER');
    const updateSeeds = (e, num) => {
        e.preventDefault()
        setSeeds(prev => prev.map(n => n + 5 * num))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAvatar({ seedName: name + imageSeed, color: COLORS[colorIndex] })
        close()
    }

    // const OuterDiv = useOuterDiv(close)

    return (<>
        {/* <OuterDiv > */}
            {/* <article className='container' > */}

                {children}

                <article>
                    <span> דמות </span>

                    <div className='flex'>
                        <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, -1)}> ▶️ </a>

                        {seeds.map(s => (
                            <Avatar
                                onClick={() => chooseImage(s)}
                                key={s} seed={s} seedName={name + s}
                                color={'#'}
                                imageSeed={imageSeed}
                            />
                        ))}

                        <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, 1)}> ◀️ </a>

                    </div>
                </article>


                <ColorsSelector setColorIndex={setColorIndex} colorIndex={colorIndex} name={name} imageSeed={imageSeed} />

                <button type="submit" onClick={handleSubmit}>
                    <Avatar seedName={name + imageSeed} color={COLORS[colorIndex]} />
                    <br />
                    שמירה
                </button>
            {/* </article> */}
        {/* </OuterDiv > */}
    </>)
}



export default AvatarSelector