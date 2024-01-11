import kaboom from "kaboom";

function addBorders(k= kaboom()) {
  const {add,rect,pos,anchor,width,height} = k  
    add([
        rect(width(),10),
        pos(0,0),
        anchor('topleft')
    ])
    add([
        rect(width(),10),
        pos(0,height()),
        anchor('botleft')
    ])
    add([
        rect(10,height()),
        pos(0,0),
        anchor('topleft')
    ])
    add([
        rect(10,height()),
        pos(width(),0),
        anchor('topright')
    ])
}
export default addBorders