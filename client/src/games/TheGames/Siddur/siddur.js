
import kaboom from 'kaboom';
import addButton from '../../code/addObjectFuncs/addButton';
import fixHeb from '../../code/utils/fixHebrew';


const Trivia = {
    tag: 'siddur Tefilla',

    name: 'סידור תפילה',

    assets: [],

    createScene(k = kaboom()) {
        const {
            setBackground, vec2,
            width: screenWidth, height: screenHeight, add,
            pos, rect, outline, anchor, color, text

        } = k

        k.scene(this.tag, (userSettings) => {
            const settings = { correctTefilla: 'shachrit' | 'mincha' | 'maariv' }

            const { correctTefilla } = settings

            setBackground(233, 233, 233)


            const setFinish = (obj) => {
                k.finish(
                    obj.is(correctTefilla),
                    // fixHeb(`תשובה לא נכונה. התשובה הנכונה הייתה: ${userSettings[trueAnswer]}`, 10)
                )
            }

            const width = screenWidth()
            const height = screenHeight()


            // addbooks
            // addshelfs
            // add clock

        })

    }
}

export default Trivia