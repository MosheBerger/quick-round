//DEBUG toggle

import kaboom from "kaboom"

function debugToggle(k=kaboom()) {
    const {debug,onKeyPress} = k

    
    onKeyPress('d', () => {
        debug.inspect = !debug.inspect
        debug.log(debug.numObjects())
    })

}

export default debugToggle
