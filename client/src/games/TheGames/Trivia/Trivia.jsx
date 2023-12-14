import React from 'react'
import GameScreen from '../../GameScreen';
import kaboom from 'kaboom';
import addButton from '../../addObjectFuncs/addButton';

function Trivia() {

    return (
        <GameScreen funcGame={theGame} />
    )
}

function theGame(k = kaboom()) {

    const { loadSprite, setBackground, vec2 } = k

    setBackground(233, 233, 233)

    const text = () => k.get('*').length
    const func = (obj) => {
        const lastText = obj.text
        obj.text = 'aya!'
        k.wait(1.5,() => {obj.text = lastText})
    }

    addButton(k, { color: '#4ec9b0', innerText: text(), onclick:func })
    addButton(k, { color: '#dcdcaa', innerText: text(), onclick:func })
    addButton(k, { color: '#b87eb4', innerText: text(), onclick:func })
    addButton(k, { color: '#9cdcfe', innerText: text(), onclick:func })
}



export default Trivia