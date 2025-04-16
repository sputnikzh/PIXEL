document.cookie = ''
let color = 'black'
let isdraw = false
const COLORS = ['black','red','blue','grey']
let colorbtnRed = document.querySelector(".red")
let colorbtnBlue = document.querySelector(".blue")
let colorbtnBlack = document.querySelector(".black")
let colorbtnGrey = document.querySelector(".grey")
let tools = document.querySelector(".tools")
let prevueColorItem = colorbtnBlack
const encode = {
    black: '0',
    red: '1',
    blue: '2',
    '': '3',
    grey: '3',
}
const decode ={
    '0': 'black',
    '1': 'red',
    '2': 'blue',
    '3': 'grey',
}
let colorItems = {
    black: colorbtnBlack,
    red: colorbtnRed,
    blue: colorbtnBlue,
    grey: colorbtnGrey,
}
tools.addEventListener('click', (e) => {
    for(let colorString of COLORS){
        if(Array.from(e.target.classList).includes(colorString)){
            color = colorString
            prevueColorItem.style.border = 'none'
           colorItems[colorString].style.border = '3px solid white' 
           prevueColorItem = colorItems[colorString]
        }
    }
})
let editor = document.querySelector('.editor')
for(let i = 0; i < 10000; i++ ){
    let square = document.createElement('div')
    square.classList.add('square')
    editor.append(square)
}

editor.addEventListener('mousedown', (e)=>{
   isdraw = true
    }
)
editor.addEventListener('mousemove', (e)=>{
   if(isdraw && Array.from(e.target.classList).includes('square')){
    e.target.style.backgroundColor = color}
}
)
editor.addEventListener('mouseup', (e)=>{
    isdraw = false
})
const squares = document.querySelectorAll('.square')
let cookie = document.cookie
let colorsCookie = ''
if(cookie.includes('colors')){
    let data = cookie.split('; ')
    for(let i of data){
        if(i.includes('colors')){
            colorsCookie = i
            break
        }
    }
}
colorsCookie = colorsCookie.replace('colors=', '')
let colorsNumArray = colorsCookie.split('|')

let index = 0
for(let colorCount of colorsNumArray){
    const[color,count] = colorCount.split('-')
    for(let i = 0; i<count;i++){
        squares[index].style.backgroundColor = decode[color]
        index += 1
    }
}
const cookieWrite = ()=>{
    let numbers = []
    let s = ''
    for(let square of squares){
        const number =  encode[square.style.backgroundColor]
        if(s === ''){
            s += number
        }
        else if(s[0] === number){
            s+= number
        }
        else{
            numbers.push(`${s[0]}-${s.length}`)
            s = number
        }
    }
    numbers.push(`${s[0]}-${s.length}`)
    document.cookie = `colors=${numbers.join('|')}; max-age=9999999999999`
}
setInterval(cookieWrite, 5000)
