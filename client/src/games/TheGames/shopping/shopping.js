import startDragSystem from '../../code/middleWares/playDragSystem';
import addDraggable from '../../code/addObjectFuncs/addDraggable';
import kaboom from 'kaboom';
import BASE_URL from '../../../BASEURL';
import fixHeb from '../../code/utils/fixHebrew';
import addBorders from '../../code/utils/addBorder';

const Shopping = {

    tag: 'shopping-game',

    name: 'קניות לשבת',

    assets: [
        ['Sound', 'chale', `${BASE_URL}/assets/sfx/chale!.mpeg`],
        ['Sound', 'chale', `${BASE_URL}/assets/sfx/chale!.mpeg`],
        ['Sprite', 'fish', `${BASE_URL}/assets/objects/fish.png`],
        ['Sprite', 'challah', `${BASE_URL}/assets/objects/challah.png`],
        ['Sprite', 'shopping-cart', `${BASE_URL}/assets/objects/shopping-cart (Phone).png`],
        ['Sprite', 'shelf', `${BASE_URL}/assets/objects/shelf (Phone).png`],
        ['Sprite', 'refrigerator', `${BASE_URL}/assets/objects/refrigerator (Phone).png`],
    ],

    createScene(k = kaboom()) {
        const {
            setBackground, vec2, add, sprite, area,
            scale, pos, anchor, rect, width,
            color, rotate, outline, onUpdate,
        } = k


        k.scene(this.tag, (userSettings) => {
            k.onUpdate(() => { k.setCursor("default") })

            const mulitple = 3
            // startDragSystem(k)

            //---- BACKGROUND
            setBackground('#8ee575')

            add([
                rect(width() + 100, 500),
                pos(0, k.height() - 400),
                color('#6eb25a'),
                rotate(5)
            ])
            //---------------

            const settings = userSettings || {
                fish: k.randi(1, 5),
                challah: k.randi(1, 5)
            }

            // message for what you need to take
            const giveMe = add([
                rect(170 * mulitple, 130 * mulitple, { radius: 20 * mulitple }),
                color('#f2f2f2'),
                anchor('topright'),
                outline(5*mulitple, '#111111'),
                pos(width() - 50, 60)

            ])
            giveMe.add([
                pos(-40, 60),
                color('#123456'),
                anchor('right'),
                k.text(fixHeb("אני צריך לכבוד שבת:"), {
                    size: 40,
                    font: 'Abraham',
                }),
            ])
            for (let i = 1; i <= settings.fish; i++) {
                giveMe.add([
                    'fish' + i,
                    scale(0.24),
                    color('#828282'),
                    pos((i - 1) * -32 * mulitple, 35.5 * mulitple),
                    sprite('fish', { flipX: true }),
                    anchor('topright'),
                ])
            }
            for (let i = 1; i <= settings.challah; i++) {
                giveMe.add([
                    'challah' + i,
                    area(),
                    scale(0.24),
                    color('#828282'),
                    pos((i - 1) * -33 * mulitple, 75.5 * mulitple),
                    sprite('challah', { flipX: true }),
                    anchor('topright'),
                ])
            }

            const shoppingCart = createShoppingCart(k)

            add([
                sprite('refrigerator'),
                pos(120 * mulitple, 170 * mulitple),
                scale(1.8),
                anchor('center'),
                area(),

            ])
            add([
                sprite('shelf'),
                pos(340 * mulitple, 170 * mulitple),
                scale(1.8),
                anchor('center'),
                area(),

            ])

            // הוספת מוצרים למדפים
            for (let i = 0, y = 90 * mulitple; i < 4; i++, y += 50 * mulitple) {
                for (let j = 0, x = 50 * mulitple; j < 4; j++, x += 45 * mulitple) {

                    addDraggable(k, {
                        sprite: 'fish',
                        scale: 0.24,
                        pos: vec2(x, y),
                        returnOnLeave: true
                    })

                }
            }

            for (let i = 0, y = 90 * mulitple; i < 4; i++, y += 55 * mulitple) {
                for (let j = 0, x = 280 * mulitple; j < 4; j++, x += 40 * mulitple) {

                    addDraggable(k, {
                        sprite: 'challah',
                        scale: 0.24,
                        pos: vec2(x, y),
                        returnOnLeave: true
                    })

                }
            }
            addBorders(k)
            // בדיקת ניצחון/הפסד
            onUpdate(() => {
                if (
                    shoppingCart.items.fish === settings.fish
                    && shoppingCart.items.challah === settings.challah
                ) {
                    k.finish(true)
                }

                if (shoppingCart.items.fish > settings.fish) {
                    k.finish(false, fixHeb('יותר מדי דגים'))
                }
                if (shoppingCart.items.challah > settings.challah) {
                    k.finish(false, fixHeb('יותר מדי חלות'))
                }
            })

        })
    }
}


function createShoppingCart(k = kaboom()) {
    const mulitple = 3

    const { vec2, add, sprite, area, scale, pos, anchor, wait } = k

    const shoppingCart = add([
        sprite('shopping-cart'),
        pos(530 * mulitple, 245 * mulitple),
        scale(1.6),
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



    shoppingCart.onCollide((obj) => {
        if (!(obj.is('fish') || obj.is('challah'))) return


        const current = shoppingCart.scale
        const scaleUp = current.add(vec2(0.05, 0.05))

        shoppingCart.scaleTo(scaleUp)

        if (obj.is('fish')) {
            shoppingCart.items.fish++

            const tag = 'fish' + shoppingCart.items.fish
            drawGiveMeItemUsChecked(tag)

        } else {
            k.play('chale', { volume: 0.1 })
            shoppingCart.items.challah++

            const tag = 'challah' + shoppingCart.items.challah
            drawGiveMeItemUsChecked(tag)
        }

        obj.destroy()

        wait(0.15, () => shoppingCart.scaleTo(current))
    })

    function drawGiveMeItemUsChecked(tag) {
        const giveMeItem = k.get(tag, { recursive: true })
        if (giveMeItem.length > 0) {
            giveMeItem[0].color = (new k.Color(255, 255, 255))
        }
    }

    return shoppingCart
}

export default Shopping