const gameBoard = document.querySelector('.game-board')
const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const scoreBoard = document.querySelector('.score')
const recordBoard = document.querySelector('.record')
const buttonReset = document.querySelector('.reset')
let scoreCounter = 0

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);

}

const updateScore = (element, counter) => {

    if(counter < 10) {
        element.innerHTML = `00000${counter}`
    } 

    if(counter >= 10 && counter < 100 ) {
        element.innerHTML = `0000${counter}`
    } 
    
    if(counter >= 100 && counter < 1000 ) {
        element.innerHTML = `000${counter}`
    } 
    
    if(counter >= 1000 && counter < 10000 ) {
        element.innerHTML = `00${counter}`
    } 
    
    if(counter >= 10000 && counter < 100000 ) {
        element.innerHTML = `0${counter}`
    } 
    
    if(counter >= 100000) {
        element.innerHTML = `0${counter}`
    }

}

const loop = () => {
    
    let scoreCounter = 0;
    const getDataBaseBestScore = () => localStorage.getItem("record") ?? [];
    const setDataBaseBestScore = (Counter) => { localStorage.setItem('record', Counter);}

    if (getDataBaseBestScore() !== null) {
        updateScore(recordBoard, getDataBaseBestScore())
    }

    const score= setInterval(function() {

        scoreCounter += 1

        updateScore(scoreBoard, scoreCounter)
        
    
    }, 100)

    const gameOver = setInterval(() => {


        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if(pipePosition <= 140 && pipePosition > 0 && marioPosition <= 110) {

            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`

            mario.classList.add('animation-none')
            mario.style.bottom = `${marioPosition}px`
            
            mario.src = 'assets/game-over.png'
            mario.style.width = '80px'
            mario.style.marginLeft = '55px'

            buttonReset.classList.add('show')

            clearInterval(gameOver)
            clearInterval(score)

            if(getDataBaseBestScore() <= scoreCounter) {
                setDataBaseBestScore(scoreCounter)
                getDataBaseBestScore()
                updateScore(recordBoard, getDataBaseBestScore());
            }

        }

    }, 50);

    
}

loop()

const reset = () => {

    pipe.classList.add('pipe-animation');
    pipe.style.setProperty('left', 'initial')

    mario.src = 'assets/mario.gif'
    mario.style.width = '170px'
    mario.style.bottom = '0'
    mario.classList.remove('animation-none')

    buttonReset.classList.remove('show')

    loop()
}


buttonReset.addEventListener('click', reset)
gameBoard.addEventListener('click', jump);
document.addEventListener('keydown', jump);