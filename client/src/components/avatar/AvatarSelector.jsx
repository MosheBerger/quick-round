import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import COLORS from './colors'


const defaultValue = [1, 2, 3, 4, 5]
const bkColors = COLORS

function AvatarSelector({ name, setAvatar, close }) {
    const [seeds, setSeeds] = useState(defaultValue)
    const [imageSeed, chooseImage] = useState(1)
    const [colorIndex, setColorIndex] = useState(0)

    console.log(seeds);
    useEffect(() => {
        const reset = () => {
            setSeeds(defaultValue)
        }
        reset()
    }, [name])

    const updateSeeds = (e, num) => {
        e.preventDefault()
        setSeeds(prev => prev.map(n => n + 5 * num))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setAvatar({ seedName: name + imageSeed, color: bkColors[colorIndex] })
        close()
    }

    const handleOuterDivClose = (e) => {
        if (e.target.className === 'outer-div') {
            close()
        }
    }

    return (<>
        <div className='outer-div' onClick={handleOuterDivClose} >

            <article className='container'>

                <div className='flex'>
                    <h2> בחירת דמות </h2>
                </div>

                <article>
                    <span> דמות </span>

                    <div className='flex'>
                        <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, -1)}> ▶️ </a>

                        {seeds.map(s => (
                            <Avatar
                                onClick={() => chooseImage(s)}
                                key={s} seed={s} seedName={name + s}
                                // color={bkColors[colorIndex]}
                                imageSeed={imageSeed}
                            />
                        ))}

                        <a href='/#' role='button' className='secondary' onClick={(e) => updateSeeds(e, 1)}> ◀️ </a>

                    </div>
                </article>


                <article>

                    <span> צבע </span>
                    <div>
                        {bkColors.map((color, index) => {
                            return <Avatar
                                onClick={(e) => { e.preventDefault(); setColorIndex(index) }}
                                key={color}
                                color={color}
                                outline={(colorIndex === index)}
                                seedName={imageSeed}
                                seed={''}
                            // style={{
                            //     background: color,
                            //     width: 50, height: 50,
                            //     outline: index === colorIndex ? '4px black solid' : '1px black solid',
                            //     // display:'inline'
                            // }}
                            >{''}</Avatar>
                        })}
                    </div>
                </article>

                <button type="submit" onClick={handleSubmit}>
                    <Avatar seedName={name + imageSeed} color={bkColors[colorIndex]} />
                    <br />
                    שמירה
                </button>
            </article>
        </div >
    </>)
}

export default AvatarSelector