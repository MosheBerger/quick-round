
import kaboom from 'kaboom';
import addButton from '../../code/addObjectFuncs/addButton';
import fixHeb from '../../code/utils/fixHebrew';
import GameScreen from '../../code/GameScreen';


function Trivia(props) {

    return <>
        <GameScreen funcGame={TriviaGame} {...props} />
    </>
}

function TriviaGame(k = kaboom()) {


    const {
        setBackground, vec2,
        width: screenWidth, height: screenHeight, add,
        pos, rect, outline, anchor, color, text, settings

    } = k

    const {
        answerA, answerB, answerC, answerD,
        question: questionText, trueAnswer

    } = settings

    setBackground(233, 233, 233)


    const setFinish = (obj) => {
        k.finish(obj.text === fixHeb(settings[trueAnswer]))
    }

    const width = screenWidth()
    const height = screenHeight()



    const question = add([
        rect(width * 0.9, height / 3, { radius: 4 }),
        pos(width / 2, height / 4),
        outline(1),
        anchor('center'),
    ])
    question.add([
        'question',
        anchor('center'),
        text(fixHeb(questionText), {
            size: 20 * 1.5,
            width: width * 0.8,
            align: 'center'
        }),
        color('#000000')

    ])

    k.onCharInput((ch) => {
        question.children[0].text += ch
    })

    addButton(k, {
        text: fixHeb(answerA),
        pos: vec2(width / 4, height * 0.6),
        size: { w: width / 2.5, h: height / 6 },
        color: '#da193b',
        onclick: setFinish
    })
    addButton(k, {
        text: fixHeb(answerB),
        pos: vec2(width * 0.75, height * 0.6),
        size: { w: width / 2.5, h: height / 6 },
        color: '#d79c02',
        onclick: setFinish,
    })

    addButton(k, {
        text: fixHeb(answerC),
        pos: vec2(width / 4, height * 0.85),
        size: { w: width / 2.5, h: height / 6 },
        color: '#1363cb',
        onclick: setFinish,
    })
    addButton(k, {
        text: fixHeb(answerD),
        pos: vec2(width * 0.75, height * 0.85),
        size: { w: width / 2.5, h: height / 6 },
        color: '#2a8b0f',
        onclick: setFinish,
    })
}



export default Trivia