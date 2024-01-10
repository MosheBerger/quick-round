import kaboom from "kaboom";
import fixHeb from "../code/utils/fixHebrew";

function roundNumScene(k = kaboom()) {

    k.scene('roundNum', ({ roundNum, playTheGame }) => {
        k.setBackground(0, 0, 150)

        k.add([
            k.text(fixHeb('סבב מספר'), {
                size: 100,
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 3),
            k.anchor('center'),
        ])
        k.add([
            k.text(roundNum, {
                size: 200,
                font: 'Abraham',
            }),
            k.pos(k.width() / 2, k.height() / 1.5),
            k.anchor('center'),
        ])


        k.wait(2, playTheGame)
    })
}

export default roundNumScene