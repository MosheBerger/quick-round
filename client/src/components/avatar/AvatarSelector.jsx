import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'

const defaultValue = [1, 2, 3, 4, 5]
const bkColors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']

const moreColors = ['#ffffff','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#','#','#','#','#','#','#','#','#','#','#','#','#']

function AvatarSelector({ name, setAvatar, close }) {
    const [seeds, setSeeds] = useState(defaultValue)
    const [imageSeed, chooseImage] = useState(0)
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
                <Avatar seedName={name + imageSeed} color={bkColors[colorIndex]} />
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
                        return <a href='/#' role='button'
                            onClick={(e) => { e.preventDefault(); setColorIndex(index) }}
                            key={color}
                            style={{
                                background: color,
                                width: 50, height: 50,
                                outline: index === colorIndex ? '4px black solid' : '1px black solid'
                            }}
                        >{''}</a>
                    })}
                </div>
            </article>

            <button type="submit" onClick={handleSubmit}> שמירה </button>
        </article>
    </div >
    </>)
}

export default AvatarSelector