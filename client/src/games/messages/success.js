import kaboom from "kaboom";
import fixHeb from "../code/utils/fixHebrew";
import GameScreen from "../code/GameScreen";

function Success(props) {

    return <>
        <GameScreen funcGame={successMessage} {...props} />
    </>
}

function successMessage(k = kaboom()) {
    const {
        setBackground,
    } = k
    setBackground('#ffffff')
}