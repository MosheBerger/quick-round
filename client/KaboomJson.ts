import kaboom, { Tag, Comp, Color, KaboomCtx, AreaComp, GameObj, PosComp, TimerComp, ColorComp, ScaleComp, SpriteComp } from "kaboom"
import drag from "./src/games/code/components/draggable"

type AssetType = 'Sprite' | 'Sound'
type UrlSource = string
type Base64Data = string

export interface JasonData {
    name: string,
    gameTag: Tag,
    description: string,
    img: string, // image url
    screenSize: 'horizontal' | 'vertical',

    objects: Array<GameObject>,
    functions: Array<DoFunc>,
    assets: Array<[AssetType, Tag, UrlSource | Base64Data]>,

}


export interface GameObject {
    tag: Tag | Array<Tag>,
    pos: { x: 0, y: 0 },
    sprite?: string, // sprite tag

    draggable?: boolean,
    timer?: { time: number, loop?: boolean, func: DoFunc }, //todo 
    scale?: number,
    color?: Color, //todo check if color is supported

    collisions?: [
        { tag: Tag, func: DoFunc }
    ],
}


export interface DoFunc {
    move?: 'up' | 'down' | 'left' | 'right' | 'stop' | { x: 0, y: 0 },
    destroy?: Tag,
    setSwitch?: { tag: Tag, value: boolean },
    animation?: { tag: Tag, anim: string },
    playSound?: string,
    win?: boolean,
    failed?: string // failed message
}

function runFunction(k: KaboomCtx, func: DoFunc) {
    if (func.destroy) {
        const whoToDestroy = k.get(func.destroy)[0]
        k.destroy(whoToDestroy)
    }
}



function CreateGameObject(k: KaboomCtx, obj: GameObject) {
    const gameObject = k.add([
        obj.tag,
        k.pos(obj.pos.x, obj.pos.y),

        //! todo DELETE THIS!!!
    ])

    if (obj.draggable)
        gameObject.use(drag(k))

    if (obj.sprite)
        gameObject.use(k.sprite(obj.sprite,)) // todo add animation

    if (obj.collisions) {
        gameObject.use(k.area())
        const g = (gameObject as unknown) as AreaComp

        obj.collisions.forEach(({ tag, func }) => {
            g.onCollide(tag, () => runFunction(k, func))

        })
    }

    if (obj.scale)
        gameObject.use(k.scale(obj.scale))

    if (obj.color)
        gameObject.use(k.color(obj.color))

    if (obj.timer) {
        const { time, loop, func } = obj.timer

        gameObject.use(k.timer())
        const g = (gameObject as unknown) as TimerComp

        if (loop)
            g.loop(time, () => runFunction(k, func))
        else
            g.wait(time, () => runFunction(k, func))
    }

    return gameObject
}

function CreateGame(k: KaboomCtx, data: JasonData) {

    const { gameTag, objects, functions, assets } = data

    k.scene(gameTag, () => {

        assets.forEach(([type, tag, source]) => {
            k['load' + type](tag, source)
        })

        objects.forEach(obj => {
            CreateGameObject(k, obj)
        })

        functions.forEach(func => {
            runFunction(k, func)
        })

    })
}

export default CreateGame