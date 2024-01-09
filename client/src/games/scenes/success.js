import kaboom from "kaboom";
import fixHeb from "../code/utils/fixHebrew";
import reverse from "../code/utils/revers";

function successScene(k = kaboom(), moveToNextGame) {

    k.scene('success', ({ time }) => {
        k.setBackground(0, 150, 0)

        k.add([
            k.text(fixHeb('כל הכבוד!'), {
                size: 100,
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 3),
            k.anchor('center'),
        ])

        k.add([
            k.text(fixHeb(`לקח לך ${reverse(time / 1000)} שניות`, {
                font: 'Abraham',
            })),
            k.pos(k.width() / 2, k.height() / 1.5),
            k.anchor('center'),
        ])


        k.wait(3, moveToNextGame)
    })
}

export default successScene