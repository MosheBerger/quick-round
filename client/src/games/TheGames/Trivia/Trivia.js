
import kaboom from 'kaboom';
import addButton from '../../code/addObjectFuncs/addButton';
import fixHeb from '../../code/utils/fixHebrew';


const Trivia = {
    tag: 'trivia-question',

    assets: [],

    createScene(k = kaboom()) {
        const {
            setBackground, vec2,
            width: screenWidth, height: screenHeight, add,
            pos, rect, outline, anchor, color, text

        } = k

        k.scene(this.tag, (userSettings) => {

            const {
                answerA, answerB, answerC, answerD,
                question: questionText, trueAnswer

            } = userSettings

            setBackground(233, 233, 233)


            const setFinish = (obj) => {
                k.finish(
                    obj.text === fixHeb(userSettings[trueAnswer]),
                    fixHeb(`תשובה לא נכונה. התשובה הנכונה הייתה: ${userSettings[trueAnswer]}`,10)
                )
            }

            const width = screenWidth()
            const height = screenHeight()


            // שאלה
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
                    size: 20 * 1.7,
                    width: width * 0.8,
                    align: 'center',
                    font: 'Abraham',
                }),
                color('#000000')

            ])

            // תשובות
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
        })


    }
}

export default Trivia