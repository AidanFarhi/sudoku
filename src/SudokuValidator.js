// Sudoku Validator Function
function sudokuValidator(solution) {
    let check = [1,2,3,4,5,6,7,8,9]
    let dupeCheck = []
    let subGroups = subGroupGenerator(solution)
  
    // generates subgroups
    function subGroupGenerator(solution) {
        const ranges = [
            [3, 3],[3, 6],[3, 9],
            [6, 3],[6, 6],[6, 9],
            [9, 3],[9, 6],[9, 9]
        ]
        const subGroups = []
        for (let i = 0; i < ranges.length; i++) {
            const subGroup = []
            let range = ranges[i]
            for (let j = range[0] - 3; j < range[0]; j++) {
                for (let k = range[1] - 3; k < range[1]; k++) {
                    subGroup.push(solution[j][k])
                }
            }
            subGroups.push(subGroup)
        }
        return subGroups
    }
    // check each sub-group for dupes and 1-9
    function subCheck(subGroups) {
        for (let group of subGroups) {
            for (let number of group) {
                if (!dupeCheck.includes(number)) {
                    dupeCheck.push(number)
                }
            }
            if (dupeCheck.length < 9) {
                return false
            } else {
                dupeCheck = []
            }
        }
        return true
    }
    // checks each row for dupes, and 1-9
    function rowCheck(row) {
        for (let num of row) {
            if (!dupeCheck.includes(num)) {
                dupeCheck.push(num)
            }
            if (!check.includes(num)) {
                return false
            }
        }
        if (dupeCheck.length < 9) {
            return false
        }
        dupeCheck = []
        return true
    }
  
    // master check
    function masterCheck(solution) {
        if (!subCheck(subGroups)) {
            return false
        } else {
            for (let i = 0; i < solution.length; i++) {
                let r = solution[i]
                if (!rowCheck(r)) {
                    return false
                }
            }
            return true
        }
    } 
    return masterCheck(solution)
}

function boardFull(board) {
    let full = true
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
            if (board[r][c] === 0) {
                full = false
            }
        }
    }
    return full
}

export default {
    isValid: sudokuValidator,
    isFull: boardFull
}
