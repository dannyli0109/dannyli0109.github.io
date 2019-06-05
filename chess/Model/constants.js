const KING_WHITE = 0
const QUEEN_WHITE = 1
const BISHOP_WHITE = 2
const KNIGHT_WHITE = 3
const ROOK_WHITE = 4
const PAWN_WHITE = 5

const KING_BLACK = 6
const QUEEN_BLACK = 7
const BISHOP_BLACK = 8
const KNIGHT_BLACK = 9
const ROOK_BLACK = 10
const PAWN_BLACK = 11

const WHITE = 0
const BLACK = 1

const SELECTED_COLOR = [239, 71, 111]
const HOVER_COLOR = [255, 209, 102]
const VALID_COLOR = [6, 214, 160]


const NORMAL_STATE = 0
const SELECTED_STATE = 1
const MOVING_STATE = 2
const DYING_STATE = 3
const PROMOTE_STATE = 4

const SQUARE = -0.5
const CIRCLE = 0

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
          