import kaboom, { Tag, Comp, Color, KaboomCtx, AreaComp, GameObj, PosComp, TimerComp, ColorComp, ScaleComp, SpriteComp } from "kaplay"
import drag from "./comps/draggable"
// import drag from "./src/games/code/components/draggable"

type AssetType = 'Sprite' | 'Sound'
type UrlSource = string
type Base64Data = string
export type AssesData = [AssetType, Tag, UrlSource | Base64Data]

export interface JasonData {
    name: string,
    gameTag: Tag,
    description: string,
    img: string, // image url
    screenSize: 'horizontal' | 'vertical',

    objects: GameObject[],
    functions: DoFunc[],
    assets: AssesData[],
    triggers: Trigger[]

}

export type collisionTrigger = {
    type: 'onCollide',
    tag1: Tag,
    tag2: Tag,
    func: DoFunc
}

export type Trigger =
    | {
        type: 'OnClick' | 'onButtonClick' | 'onDestroy',
        func: DoFunc
        tag1: Tag,
    }
    | collisionTrigger

export interface GameObject {
    tag: Tag | Tag[],
    pos: { x: number, y: number },
    sprite?: string, // sprite tag

    draggable?: { returnOnLeave: boolean },
    timer?: { time: number, loop?: boolean, func: DoFunc }, //todo 
    scale?: number,
    color?: Color, //todo check if color is supported
}

export type DoFunc = {
    setSwitch?: { tag: Tag, value: boolean },
    animation?: { tag: Tag, anim: string },
    playSound?: Tag,
    win?: boolean,
    failed?: string // failed message
}
    & (moveFunc | destroyFunc)

type destroyFunc = {
    type: 'destroy',
    tag: Tag
}

type moveFunc = {
    type: 'move',
    where: 'up' | 'down' | 'left' | 'right' | 'stop' | { x: 0, y: 0 },
}

function runFunction(k: KaboomCtx, func: DoFunc) {

    switch (func.type) {

        case "destroy":
            const whoToDestroy = k.get(func.tag)[0]
            k.destroy(whoToDestroy)
            break

        case "move":
        //todo
    }

    if (func.playSound) {
        k.play(func.playSound)
    }
}



function CreateGameObject(k: KaboomCtx, obj: GameObject) {

    k.debug.inspect = true

    const gameObject = k.add([
        obj.tag,
        k.pos(obj.pos.x, obj.pos.y),
        k.anchor('center'),
        k.area({ scale: 0. }),
    ])

    if (obj.draggable) {
        gameObject.use(k.scale())
        gameObject.use(drag(k, { returnOnLeave: obj.draggable.returnOnLeave }))
    }

    if (obj.sprite)
        gameObject.use(k.sprite(obj.sprite)) // todo add animation

    // if (obj.collisions) {
    //     // gameObject.use(k.area())
    //     const g = (gameObject as unknown) as AreaComp

    //     obj.collisions.forEach(({ tag, func }) => {
    //         g.onCollide(tag, () => runFunction(k, func))
    //     })
    // }

    if (obj.scale)
        gameObject.use(k.scale(obj.scale))

    if (obj.color)
        gameObject.use(k.color(obj.color))

    if (obj.timer) {
        const { time, loop, func } = obj.timer

        gameObject.use(k.timer())
        const g = (gameObject as unknown) as TimerComp

        g.wait(time, () => {
            if (loop)
                g.loop(time, () => runFunction(k, func))
            else
                runFunction(k, func)
        })
    }

    return gameObject
}

function createGame(k: KaboomCtx, data: JasonData) {

    const { gameTag, objects = [], functions = [], assets = [] } = data

    k.scene(gameTag, () => {

        for (const [type, tag, source] of assets) {
            k['load' + type](tag, source)
        }
        for (const obj of objects) {
            console.log('creating', obj);
            CreateGameObject(k, obj)
        }

        for (const func of functions) {
            runFunction(k, func)
        }



        k.wait(2, () => console.log('game created', k.get('*')))

    })
    k.go(gameTag)

}

function createTrigger(k: KaboomCtx, trigger: Trigger) {

    const { type, func, tag1 } = trigger
    const { tag2 } = trigger as collisionTrigger

    //TODO HERE
    switch (type) {
        case 'onButtonClick':
            k.onClick(tag1, () => runFunction(k, func))
            break

        case 'onCollide':
            const target = k.get(tag1) as GameObj<AreaComp>[]
            
            if (target.length === 1) {
                target[0].onCollide(tag2, () => runFunction(k, func))
                break
            }
            k.onCollide(tag1, tag2, () => runFunction(k, func))
            break

        case 'onDestroy':
            k.onDestroy(tag1, () => runFunction(k, func))
            break

        case 'OnClick':
            k.onClick(tag1, () => runFunction(k, func))
            break
    }
}

export default createGame