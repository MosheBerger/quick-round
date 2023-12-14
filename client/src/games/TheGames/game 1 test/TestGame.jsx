import React from 'react'
import GameScreen from '../../GameScreen';
import startDragSystem from '../../middleWares/playDragSystem';
import addDraggable from '../../addObjectFuncs/addDraggable';
import kaboom from 'kaboom';

function TestGame() {

    return (
        <GameScreen funcGame={theGame} />
    )
}

function theGame(k = kaboom()) {
    const { loadSprite, setBackground, vec2 } = k

    const dragObject = startDragSystem(k)

    setBackground(233, 233, 233)

    loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
    loadSprite('fish', 'http://192.168.199.216:8080/objects/fish.png')
    loadSprite('challah', 'http://192.168.199.216:8080/objects/challah.png')
    loadSprite('shopping-cart', 'http://192.168.199.216:8080/objects/shopping-cart (phone).png')
    loadSprite('shelf', 'http://192.168.199.216:8080/objects/shelf (Phone).png')
    loadSprite('refrigerator', 'http://192.168.199.216:8080/objects/refrigerator (phone).png')

    addDraggable(k, dragObject, { sprite: 'refrigerator', pos:   vec2(120,170), scale: 0.6 })
    addDraggable(k, dragObject, { sprite: 'shelf', pos:   vec2(340,170), scale: 0.6 })

    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'fish', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'challah', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'challah', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'challah', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'challah', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'challah', scale: 0.1 })
    // addDraggable(k, dragObject, { sprite: 'kaboom', pos:   center() })

    addDraggable(k, dragObject, { sprite: 'shopping-cart', pos:   vec2(530,245), scale: 0.5 })

    //   wait(3,() => {  destroyAll('*')})
    // some.onCollide('kaboom', (kaboom) => {
    // 	kaboom.destroy()
    // })
}



export default TestGame