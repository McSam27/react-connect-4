// function to calculate if a player has won
export function checkWin(board) {
  let beginning = 0,
    midpoint = Math.floor(board.length / 2),
    end_col = board.length - 1,
    end_row = board[0].length - 1;

  // diagonal north-east
  for (var c = beginning; c <= midpoint; c++) {
    for (var r = end_row; r >= midpoint; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c + 1][r - 1] &&
        board[c][r] === board[c + 2][r - 2] &&
        board[c][r] === board[c + 3][r - 3]
      ) {
        return true;
      }
    }
  }

  // diagonal north-west
  for (c = end_col; c >= midpoint; c--) {
    for (r = end_row; r >= midpoint; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c - 1][r - 1] &&
        board[c][r] === board[c - 2][r - 2] &&
        board[c][r] === board[c - 3][r - 3]
      ) {
        return true;
      }
    }
  }

  // vertical
  for (c = beginning; c <= end_col; c++) {
    for (r = end_row; r >= midpoint; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c][r - 1] &&
        board[c][r] === board[c][r - 2] &&
        board[c][r] === board[c][r - 3]
      ) {
        return true;
      }
    }
  }

  // horizontal
  for (c = beginning; c <= midpoint; c++) {
    for (r = end_row; r >= beginning; r--) {
      if (
        board[c][r] !== "" &&
        board[c][r] === board[c + 1][r] &&
        board[c][r] === board[c + 2][r] &&
        board[c][r] === board[c + 3][r]
      ) {
        return true;
      }
    }
  }

  // if no winner
  return false;
}

export const emptyBoard = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""]
];
