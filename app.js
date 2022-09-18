const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const currentScore = document.querySelector('.current-score')

const colors = ['#00FFFF','#F0F8FF','#FAEBD7','#000000','#FAEBD7','#DC143C','#7FFF00','#00FFFF','#8B008B','#FF1493']

let time = 20000
let score = 0



startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click',event => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    timeEl.innerHTML = `00:${time}`
}
function decreaseTime() {
    if(time === 0){
        finishGame()
    }else{
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }  
}
function setTime(value){
    timeEl.innerHTML = `00:${time}`
}

function finishGame() {
    board.innerHTML = `<h1 class="primary">Игра окончена <br> Счет:${score} </h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 40)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0,width -size)
    const y = getRandomNumber(0,height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${getRandomColor()}`

    currentScore.innerHTML = `<span> ваш счет: ${score}</span>`
    board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() *colors.length)
    console.log(colors[index]);
    return colors[index]
}
