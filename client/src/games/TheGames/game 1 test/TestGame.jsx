import React from 'react'
import GameScreen from '../../GameScreen';
import startDragSystem from '../../middleWares/playDragSystem';
import addDraggable from '../../addObjectFuncs/addDraggable';
import kaboom from 'kaboom';


function TestGame(k = kaboom()) {
    const { loadSprite, setBackground, vec2 } = k

    startDragSystem(k)

    setBackground(233, 233, 233)

    loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
    loadSprite('fish', 'http://localhost:8080/objects/fish.png')
    loadSprite('challah', 'http://localhost:8080/objects/challah.png')
    loadSprite('shopping-cart', 'http://localhost:8080/objects/shopping-cart (phone).png')
    loadSprite('shelf', 'http://localhost:8080/objects/shelf (Phone).png')
    loadSprite('refrigerator', 'http://localhost:8080/objects/refrigerator (phone).png')

    addDraggable(k, { sprite: 'kaboom', pos:   vec2(120,170), scale: 0.6 })
    addDraggable(k, { sprite: 'refrigerator', pos:   vec2(120,170), scale: 0.6 })
    addDraggable(k, { sprite: 'shelf', pos:   vec2(340,170), scale: 0.6 })
    addDraggable(k, { sprite: 'shopping-cart', pos:   vec2(530,245), scale: 0.5 })

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


    //   wait(3,() => {  destroyAll('*')})
    // some.onCollide('kaboom', (kaboom) => {
    // 	kaboom.destroy()
    // })
}



export default TestGame