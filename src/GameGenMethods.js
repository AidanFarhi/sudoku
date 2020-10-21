// Generate random cell choices in range(0, 81)
// limit = difficulty
function generateChoices(limit) {
    const cellChoices = []
    let count = 0
    while (count < limit) {
        let num = Math.floor(Math.random() * 81)
            if (!cellChoices.includes(num)) {
            cellChoices.push(num)
            count++
        }
    }
    return cellChoices
}
// translate each choice to a matrix index
function numberToCoordinate(num) {
    let row = 0
    let col = 0
    if (num < 9) {
        row = 0
        col = num
    } else if (num === 9) {
        row = 1
        col = 0
    } else if (num > 9 && num < 18) {
        row = ~~(num / 10)
        col = num % 9
    } else if (num > 17 && num < 20) {
        row = ~~(num /10) + 1
        col = num % 9
    } else if (num > 19 && num < 27) {
        row = ~~(num / 10)
        col = num % 9
    } else if (num > 26 && num < 30) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else if (num > 27 && num < 36) {
        row = ~~(num / 10)
        col = num % 9
    } else  if (num > 35 && num < 40) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else if (num > 39 && num < 45) {
        row = ~~(num / 10)
        col = num % 9
    } else if (num > 44 && num < 50) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else if (num > 49 && num < 54) {
        row = ~~(num / 10)
        col = num % 9 
    } else if (num > 53 && num < 60) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else if (num > 59 && num < 63) {
        row = ~~(num / 10)
        col = num % 9
    } else if (num > 62 && num < 70) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else if (num > 69 && num < 72) {
        row = ~~(num / 10)
        col = num % 9
    } else if (num > 71 && num < 80) {
        row = ~~(num / 10) + 1
        col = num % 9
    } else {
        row = 8
        col = 8
    }
    return [row, col]
}
// Make a fully completed game
function findEmptyLocation(board, list) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          list[0] = i
          list[1] = j
          return true
        }
      }
    }
    return false
}
function usedInRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return true
        }
    }
    return false
}
function usedInCol(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return true
        }
    }
    return false
}
function usedInBox(board, row, col, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + row][j + col] === num) {
                return true
            }
        }
    }
    return false
}
function checkIfLocationIsSafe(board, row, col, num) {
    let result = 
    !usedInRow(board, row, num) &&
    !usedInCol(board, col, num) &&
    !usedInBox(board, row - row % 3, col - col % 3, num)
    return result               
}
function solver(board) {
    const list = [0, 0]
    if (!findEmptyLocation(board, list)) {
        return true
    }
    let row = list[0]
    let col = list[1]
    for (let n = 1; n < 10; n++) {
        if (checkIfLocationIsSafe(board, row, col, n)) {
            board[row][col] = n
            if (solver(board)) {
                return true
            }
            board[row][col] = 0
        }
    }
    return false
}
function makeEmptyBoard() {
    const board = []
    for (let i = 0; i < 9; i++) {
        board.push(Array(9).fill(0))
    }
    return board
}
function randomNums() {
    let result = []
    for (let i = 0; i < 6; i++) {
        result.push(Math.floor(Math.random() * 9) + 1)
    }
    return result
}
function prefill(board) {
    let randoms = randomNums()
    let pre = [
        [0, 0], [1, 4], [2, 8],
        [3, 1], [4, 5], [5, 7]
    ]
    for (let i = 0; i < randoms.length; i++) {
        board[pre[i][0]][pre[i][1]] = randoms[i]
    }
}
function fullBoardMaker() {
    const board = makeEmptyBoard()
    prefill(board)
    solver(board)    
    return board
}
function generateGame(diffculty) {
    const choices = generateChoices(diffculty)
    const game = fullBoardMaker()
    for (let i = 0; i < choices.length; i++) {
        let coordinates = numberToCoordinate(choices[i])
        let row = coordinates[0]
        let col = coordinates[1]
        game[row][col] = 0
    }
    return game
}

module.exports = 

class GameGenerator {
    constructor() {
        this.EASY = 43
        this.MEDIUM = 51
        this.HARD = 56
        this.EXPERT = 58
        this.TEST = 1
    }
    createEasy() {
        return generateGame(this.EASY)
    }
    createMedium() {
        return generateGame(this.MEDIUM)
    }
    createHard() {
        return generateGame(this.HARD)
    }
    createExpert() {
        return generateGame(this.EXPERT)
    }
    creatTest() {
        return generateGame(this.TEST)
    }
}
