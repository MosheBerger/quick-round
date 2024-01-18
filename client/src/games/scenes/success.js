import kaboom from "kaboom";
import fixHeb from "../code/utils/fixHebrew";
// import reverse from "../code/utils/revers";

const accolades = ['כל הכבוד!','מעולה!','אין כמוך!','מצוין!','אליפות!','מדהים!','ממש השראה!','עם כזה כישרן, לך תלמד גמרא במקום!']

function successScene(k = kaboom(), moveToNextGame) {

    k.scene('success', ({ time }) => {
        k.setBackground(0, 150, 0)

        k.add([
            k.text(fixHeb(k.choose(accolades)), {
                size: 100,
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor('center'),
        ])

        // k.add([
        //     k.text(fixHeb(`לקח לך ${reverse((time / 1000).toFixed(2))} שניות`, {
        //         font: 'Abraham',
        //     })),
        //     k.pos(k.width() / 2, k.height() / 1.5),
        //     k.anchor('center'),
        // ])

        k.onKeyPress(moveToNextGame)
        k.onClick(moveToNextGame)
        k.wait(3, moveToNextGame)
    })
}

export default successScene