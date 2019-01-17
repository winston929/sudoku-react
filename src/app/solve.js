function sudoku(board) {
  const valid = solve(board);
  return {
    board,
    valid
  };
}

function solve(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0 || board[i][j] === '') {
        for (let k = 1; k <= 9; k++) {
          board[i][j] = k;
          if (isValid(board, i, j) && solve(board)) return true;
          board[i][j] = 0;
        }
        return false;
      }
    }
  }
  return true;
}
function isValid(board, row, column) {
  return (
    checkRow(board, row) &&
    checkColumn(board, column) &&
    checkSection(board, row, column)
  );
}

function checkRow(board, row) {
  const rowList = board[row].filter(n => n !== 0 && n !== '');
  return rowList.length === [...new Set(rowList)].length;
}

function checkColumn(board, column) {
  const columnList = [];
  for (let i = 0; i < 9; i++) {
    if (board[i][column] !== 0 && board[i][column] !== '') {
      columnList.push(board[i][column]);
    }
  }
  return columnList.length === [...new Set(columnList)].length;
}

function checkSection(board, row, column) {
  row = Math.floor(row / 3) * 3;
  column = Math.floor(column / 3) * 3;
  const list = [];
  for (let i = row; i < row + 3; i++) {
    for (let j = column; j < column + 3; j++) {
      if (board[i][j] !== 0 && board[i][j] !== '') {
        list.push(board[i][j]);
      }
    }
  }
  return list.length === [...new Set(list)].length;
}

export default sudoku;