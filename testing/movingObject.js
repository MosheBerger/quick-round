const circ = document.createElement('img')
circ.src = 'circ.svg'
circ.height = 100
circ.width = 100
circ.style.cursor = 'move'
circ.style.userSelect = 'none'
circ.style.position = 'relative'

const root = document.querySelector('#root')
// root.append('hello world!')
root.append(circ)


const moving= false
root.addEventListener('mousemove', (el) => {
    console.log('x',el.clientX);
    console.log('y',el.clientY);
    console.log('y',circ.offsetLeft);
    circ.style.left = el.offsetX+'px'
    circ.style.top = el.offsetY+'px'
},{capture:true})
root.addEventListener('mouseenter', (el) => {
    circ.style.left = el.offsetX+'px'
    circ.style.top = el.offsetY+'px'
})