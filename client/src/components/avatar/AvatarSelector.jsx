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

function AvatarSelector({ name, setAvatar }) {
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
    }

    return (<>
        <div>AvatarSelector</div>
        {seeds.map(s => (
            <Avatar
                onClick={() => chooseImage(s)}
                key={s} seed={s} seedName={name + s}
                color={bkColors[colorIndex]}
                imageSeed={imageSeed}
            />
        ))}

        <button onClick={(e) => updateSeeds(e, 1)}>next avatars</button>
        <button onClick={(e) => updateSeeds(e, -1)}>last avatars</button>
        <br />

        {bkColors.map((color, index) => {
            return <button
                onClick={(e) => { e.preventDefault(); setColorIndex(index) }}
                key={color} style={{ background: color, width: 50, height: 50, outline: index === colorIndex ? '4px black solid' : '1px black solid'}}
            />
        })}
        <button type="submit" onClick={handleSubmit}>choose this avatar</button>
    </>)
}

export default AvatarSelector