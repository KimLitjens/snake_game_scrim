const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}

let timerId = setInterval(move, 1000)

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()

function control(e) {
    (e.keyCode === 39) ? (direction = 1)
        : (e.keyCode === 38) ? (direction = -width)
            : (e.keyCode === 37) ? (direction = -1)
                : (e.keyCode === 40) ? (direction = +width)
                    : ''
}

document.addEventListener('keyup', control)