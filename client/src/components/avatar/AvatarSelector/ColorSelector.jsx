import Avatar from "../Avatar";
import COLORS from "./colors";

function ColorsSelector({setColorIndex, colorIndex, name, imageSeed }) {
    return (<article>

        <span> צבע </span>
        <div>
            {COLORS.map((color, index) => {
                return <Avatar onClick={e => {
                    e.preventDefault();
                    setColorIndex(index);
                }} key={color} color={color} outline={colorIndex === index} seedName={name + imageSeed} seed={''} />;
            })}
        </div>
    </article>);
}

export default ColorsSelector