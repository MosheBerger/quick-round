import startGame from "kaplay"
import createGame, { JasonData } from "./KaboomJson"


const k = startGame()

// k.loadSprite("bean", "sprites/bean.png")

const data: JasonData = {
	gameTag: "game",
	name: "name",
	description: "description",
	img: "img",
	screenSize: "horizontal",
	functions: [],
	triggers: [
		{ type: 'onCollide', tag1: 'player', tag2: 'enemy', func: { type: "destroy", tag: "player", playSound: 'aya' } }
	],
	objects: [
		{
			tag: "player",
			pos: { x: 0, y: 100 },
			sprite: "link",
			scale: 2,
			draggable: { returnOnLeave: true },
			// timer: { time: 3, loop: false, func: { destroy: "player" } }
		},
		{
			tag: "enemy",
			pos: { x: 200, y: 200 },
			sprite: 'link',
			draggable: { returnOnLeave: true },
		},
		{
			tag: "enemy",
			pos: { x: 400, y: 400 },
			sprite: 'link'
		},
		{
			tag: "enemy",
			pos: { x: 500, y: 500 },
			sprite: 'link'
		},
		{
			tag: "enemy",
			pos: { x: 600, y: 600 },
			sprite: 'link'
		}
	],
	// functions: [
	// 	{
	// 		name: "moveup",
	// 		code: "this.move(0, -10 * this.speed)"
	// 	}
	// ],
	assets: [
		["Sprite", "link", "sprites/bean.png"],
		['Sound', 'aya', 'https://cdn.pixabay.com/audio/2022/08/01/audio_b030df34c6.mp3']
	]
}


createGame(k, data)


// k.add([
// 	k.pos(120, 80),
// 	k.sprite("bean"),
// ])

// k.onClick(() => k.addKaboom(k.mousePos()))