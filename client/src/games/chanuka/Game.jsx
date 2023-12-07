import React, { useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import URLImage from '../URLImage'

function Game() {
    const [status, setStatus] = useState(null)




    console.log(status);
    return (
        <Stage width={540} height={360} >
            <Layer >
                <Rect
                    x={20}
                    y={50}
                    width={100}
                    height={100}
                    fill="red"
                    
                    onClick={() => setStatus(prev => prev + '!')}
                />
                <URLImage src={"https://konvajs.org/assets/yoda.jpg"} height={50} width={50} x={100} />
                {/* <Image  image={img} width={100} height={100} /> */}
                {/* {Img()} */}
                { }
            </Layer>
        </Stage>
    )
}

export default Game