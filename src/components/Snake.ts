import styles from '../styles/Snake.module.css'

type SquareTypes = 'emptySquare' | 'snakeSquare' | 'foodSquare'
type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft';

export const Snake = /*html*/`
    <div class="modal fade" id="snake" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-1" id="exampleModalLabel">Snake</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="board" class="d-grid ${styles.board}"></div>
            <div class="fs-2 d-flex justify-content-between mt-1">
              <div>Score: <div id="scoreBoard" class="d-inline-flex"></div></div>
              <button id="start" class="fs-5 btn btn-danger">Iniciar</button>
            </div>
            <div id="gameOver" class="fs-4 text-center">Game Over</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `

const SetupSnake = () => {
  const boardSize = 10
  const gameSpeed = 100
  const squareTypes = { emptySquare: 0, snakeSquare: 1, foodSquare: 2 }

  const directions = { ArrowUp: -10, ArrowDown: 10, ArrowRight: 1, ArrowLeft: -1 }
  //Game variables
  let snake: string[], score: number, direction: Direction, boardSquares: number[][]
  let emptySquares: string[], moveInterval: number | null

  const drawSnake = () => {
    $.each(snake, (_, square) => drawSquare(square, 'snakeSquare'))
  }
  // Rellena cada cuadrado del tablero
  // @params 
  // square: posicion del cuadrado,
  // type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
  const drawSquare = (square: string, type: SquareTypes) => {
    const [row, column] = square.split('');
    boardSquares[Number(row)][Number(column)] = squareTypes[type];
    $(`#${square}`).attr('class', `${styles.square} ${styles[type]}`);

    if (type === 'emptySquare') {
      emptySquares.push(square);
    } else {
      if (emptySquares.indexOf(square) !== -1) {
        emptySquares.splice(emptySquares.indexOf(square), 1);
      }
    }
  }

  const moveSnake = () => {
    const newSquare = String(Number(snake[snake.length - 1]) + directions[direction]).padStart(2, '0')
    const [row, column] = newSquare.split('')

    if (Number(newSquare) < 0 || Number(newSquare) > boardSize * boardSize ||
      (direction === 'ArrowRight' && Number(column) === 0) ||
      (direction === 'ArrowLeft' && Number(column) === 9 ||
        boardSquares[Number(row)][Number(column)] === squareTypes.snakeSquare)) {
      gameOver();
    } else {
      snake.push(newSquare);
      if (boardSquares[Number(row)][Number(column)] === squareTypes.foodSquare) {
        addFood();
      } else {
        const emptySquare = snake.shift();
        drawSquare(emptySquare!, 'emptySquare');
      }
      drawSnake();
    }
  }

  const addFood = () => {
    score++
    updateScore()
    createRandomFood()
  }

  const gameOver = () => {
    $('#gameOver').removeClass('d-none').addClass('d-block')
    clearInterval(moveInterval!)
    $('#start').prop('disabled', false)
  }

  const setDirection = (newDirection: Direction) => {
    direction = newDirection
  }

  const directionEvent = (key: { code: string }) => {
    switch (key.code) {
      case 'ArrowUp':
        direction !== 'ArrowDown' && setDirection(key.code)
        break
      case 'ArrowDown':
        direction !== 'ArrowUp' && setDirection(key.code)
        break
      case 'ArrowLeft':
        direction !== 'ArrowRight' && setDirection(key.code)
        break
      case 'ArrowRight':
        direction !== 'ArrowLeft' && setDirection(key.code)
        break
    }
  }

  const createRandomFood = () => {
    const randomEmptySpace = emptySquares[Math.floor(Math.random() * emptySquares.length)]
    drawSquare(randomEmptySpace, 'foodSquare')
  }

  const updateScore = () => {
    $('#scoreBoard').html(String(score))
  }

  const createBoard = () => {
    $.each(boardSquares, (rowIndex, row) => {
      $.each(row, (columnIndex, _) => {
        const squareValue = `${rowIndex}${columnIndex}`
        const squareElement = $('<div>', { class: `${styles.square} ${styles.emptySquare}`, id: squareValue })
        $('#board').append(squareElement)
        emptySquares.push(squareValue)
      })
    })
  }

  const setGame = () => {
    snake = ['00', '01', '02', '03']
    score = snake.length
    direction = 'ArrowRight'
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))
    console.log(boardSquares)
    $('#board').html('')
    emptySquares = []
    createBoard()
  }

  const startGame = () => {
    setGame()
    $('#gameOver').removeClass('d-block').addClass('d-none')
    $('#start').prop('disabled', true)
    drawSnake()
    updateScore()
    createRandomFood()
    $(document).on('keydown', directionEvent)
    moveInterval = setInterval(() => moveSnake(), gameSpeed);
  }

  $('#start').on('click', startGame)
}

export default SetupSnake