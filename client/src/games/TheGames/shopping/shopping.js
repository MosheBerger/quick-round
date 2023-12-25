import startDragSystem from '../../code/middleWares/playDragSystem';
import addDraggable from '../../code/addObjectFuncs/addDraggable';
import kaboom from 'kaboom';
import BASE_URL from '../../../BASE URL';

function TestGame(k = kaboom(), settings, setResult) {
    const { loadSprite, setBackground, vec2, add, sprite, area, scale, pos, anchor, rect, width, color, rotate, loadSound, outline, onUpdate, } = k

    const mulitple = 1.5
    startDragSystem(k)

    //---- BACKGROUND
    setBackground('#8ee575')
    add([
        rect(width() + 100, 200),
        pos(0, k.height() - 200),
        color('#6eb25a'),
        rotate(5)
    ])
    //---------------

    // loadSound('sadViolin',`${BASE_URL}/assets/sfx/19011_ViolinComedy_CTE09_98.2.mp3`)
    // const violin = k.play('sadViolin',{paused:true})

    loadSound('chale', `${BASE_URL}/assets/sfx/chale!.mpeg`)

    // k.onMouseDown(() => {
    //     violin.play()
    // })

    loadSprite('kaboom', 'https://kaboomjs.com/static/img/ka.svg')
    loadSprite('fish', `${BASE_URL}/assets/objects/fish.png`)
    loadSprite('challah', `${BASE_URL}/assets/objects/challah.png`)
    loadSprite('shopping-cart', `${BASE_URL}/assets/objects/shopping-cart (phone).png`)
    loadSprite('shelf', `${BASE_URL}/assets/objects/shelf (Phone).png`)
    loadSprite('refrigerator', `${BASE_URL}/assets/objects/refrigerator (phone).png`)

    settings = settings || {
        fish: k.randi(1, 5),
        challah: k.randi(1, 5)
    }

    const giveMe = add([
        rect(170 * mulitple, 100 * mulitple, { radius: 20 * mulitple }),
        color('#f2f2f2'),
        anchor('topright'),
        outline(5, '#111111'),
        pos(width() - 20, 30)

    ])
    for (let i = 0; i < settings.fish; i++) {
        giveMe.add([
            scale(0.12),
            pos(i * -30*mulitple, 5.5*mulitple),
            sprite('fish', { flipX: true }),
            anchor('topright'),
        ])
    }
    for (let i = 0; i < settings.challah; i++) {
        giveMe.add([
            scale(0.12),
            pos(i * -31*mulitple, 45.5*mulitple),
            sprite('challah', { flipX: true }),
            anchor('topright'),
        ])
    }

    // addDraggable(k, { sprite: 'refrigerator', pos: vec2(120, 170), scale: 0.6 })
    // addDraggable(k, { sprite: 'shelf', pos: vec2(340, 170), scale: 0.6 })
    // addDraggable(k, { sprite: 'shopping-cart', pos: vec2(530, 245), scale: 0.5 })

    add([
        sprite('refrigerator'),
        pos(120 * mulitple, 170 * mulitple),
        scale(0.9),
        anchor('center'),
        area(),

    ])
    add([
        sprite('shelf'),
        pos(340 * mulitple, 170 * mulitple),
        scale(0.9),
        anchor('center'),
        area(),

    ])
    const shoppingCart = createShoppingCart(k)

    for (let i = 0, y = 90 * mulitple; i < 4; i++, y += 50 * mulitple) {

        for (let j = 0, x = 50 * mulitple; j < 4; j++, x += 45 * mulitple) {

            addDraggable(k, { sprite: 'fish', scale: 0.12, pos: vec2(x, y) })

        }
    }

    for (let i = 0, y = 90 * mulitple; i < 4; i++, y += 55 * mulitple) {

        for (let j = 0, x = 280 * mulitple; j < 4; j++, x += 40 * mulitple) {

            addDraggable(k, { sprite: 'challah', scale: 0.12, pos: vec2(x, y) })

        }
    }

    onUpdate(() => {
        if (
            shoppingCart.items.fish === settings.fish
            && shoppingCart.items.challah === settings.challah
        ) {
            setResult('winner')
        }

        if (
            shoppingCart.items.challah > settings.challah
            || shoppingCart.items.fish > settings.fish
        ) {
            setResult('you lose..')
        }
    })



    //   wait(3,() => {  destroyAll('*')})
    // some.onCollide('kaboom', (kaboom) => {
    // 	kaboom.destroy()
    // })
}


function createShoppingCart(k = kaboom()) {
    const mulitple = 1.5

    const { vec2, add, sprite, area, scale, pos, anchor, wait } = k

    const shoppingCart = add([
        sprite('shopping-cart'),
        pos(530 * mulitple, 245 * mulitple),
        scale(0.8),
        anchor('center'),
        area(),
        {
            id: "הלוכת",
            items: {
                challah: 0,
                fish: 0
            },
            inspect() {
                return `${this.items.fish} :םיגד , ${this.items.challah} :תולח `
            }
        },
    ])


    // const fishText = shoppingCart.add([
    //     k.text(`${shoppingCart.items.fish}:םיגד `),
    //     anchor('center'),
    //     color('#000000'),
    //     pos(0, -100),

    // ])
    // shoppingCart.fishText = fishText


    // const challahText = shoppingCart.add([
    //     k.text(`${shoppingCart.items.challah}:תולח `),
    //     anchor('center'),
    //     color('#000000'),
    //     pos(0, -150),

    // ])
    // shoppingCart.challahText = challahText


    shoppingCart.onCollide((obj) => {
        if (!(obj.is('fish') || obj.is('challah'))) return


        const current = shoppingCart.scale
        const scaleUp = current.add(vec2(0.05, 0.05))

        shoppingCart.scaleTo(scaleUp)

        if (obj.is('fish')) {
            shoppingCart.items.fish++
            // shoppingCart.fishText.text = `${shoppingCart.items.fish}:םיגד `

        } else {
            k.play('chale', { volume: 0.1 })
            shoppingCart.items.challah++
            // shoppingCart.challahText.text = `${shoppingCart.items.challah}:תולח `
        }
        obj.destroy()

        wait(0.15, () => shoppingCart.scaleTo(current))
    })
    return shoppingCart
}

export default TestGame