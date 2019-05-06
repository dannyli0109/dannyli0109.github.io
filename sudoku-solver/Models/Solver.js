class Solver {
    constructor(board) {
        this.board = board
        this.cells = board.getNotFixedCells()
        this.backtrack = []
        this.solved = false
    }

    next() {
        if (this.cells.length == 0 || this.board.allFilled()) {
            this.solved = true
            return
        }
        let current = this.cells.shift()
        this.board.updatePossibleValues()
        let nextIndex = current.getNextAvaliableIndex()
        if (nextIndex > -1) {
            if (current.number < current.possibleValues[nextIndex]) {
                current.number = current.possibleValues[nextIndex]
                this.backtrack.push(current)
                return
            }
        }
        this.cells.unshift(current)
        current.number = 0
        this.board.updatePossibleValues()
        let bt = this.backtrack.pop()
        this.cells.unshift(bt)
    }

    destroy() {
        this.cells = []
        this.backtrack = []
    }
}