
import kaboom from 'kaboom';
import addButton from '../../addObjectFuncs/addButton';
import fixHeb from '../../utils/fixHebrew';


function TriviaGame(k = kaboom(), settings = {}, setResult) {


    const {
        answerA, answerB, answerC, answerD,
        question: questionText, trueAnswer

    } = settings

    const {
        setBackground, vec2,
        width: screenWidth, height: screenHeight, add,
        pos, rect, outline, anchor, color, text

    } = k

    setBackground(233, 233, 233)


    // const text = () => k.get('*').length

    // const func = (obj) => {
    //     obj.text = 'aya!'
    //     k.wait(1.5, () => { obj.text = obj.originalText })
    // }
    const func = (obj) => {
        if (obj.text === settings[trueAnswer]) {
            setResult('winner')
        }
        else {
            setResult('lose')
        }
    }
    // k.onMouseMove((p, d) => {
    //     console.log('how many:', p);
    //     console.log('delta:', d);
    // })

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
            size: 20*2,
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
        onclick: func
    })
    addButton(k, {
        text: fixHeb(answerB),
        pos: vec2(width * 0.75, height * 0.6),
        size: { w: width / 2.5, h: height / 6 },
        color: '#d79c02',
        onclick: func,
    })

    addButton(k, {
        text: fixHeb(answerC),
        pos: vec2(width / 4, height * 0.85),
        size: { w: width / 2.5, h: height / 6 },
        color: '#1363cb',
        onclick: func,
    })
    addButton(k, {
        text: fixHeb(answerD),
        pos: vec2(width * 0.75, height * 0.85),
        size: { w: width / 2.5, h: height / 6 },
        color: '#2a8b0f',
        onclick: func,
    })
}



export default TriviaGame