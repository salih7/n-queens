/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// hasAnyRowConflicts
// hasAnyColConflicts
// hasAnyMajorDiagonalConflicts
// hasAnyMinorDiagonalConflicts

window.traverseBoard = function(board, row, n, conflictTest, callback) {
  if(row === n) {
    return callback();
  }

  for(var i = 0; i < n; i++) {  
    board.togglePiece(row, i);
    if(row === n - 1 && !board[conflictTest]()) {
      var result = traverseBoard(board, row + 1, n, conflictTest, callback);
      if(result) {
        return result;
      }
    } else {
      if(!board[conflictTest]()) {
        var result = traverseBoard(board, row + 1, n, conflictTest, callback);
        if(result) {
          return result;
        }
      } 
    } 
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {
  var solution = null;
  var board = new Board({ n : n });

  solution = traverseBoard(board, 0, n, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  console.log(JSON.stringify(solution));
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({ n : n });

  traverseBoard(board, 0, n, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = null;
  var board = new Board({ n : n });

  solution = traverseBoard(board, 0, n, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if(n === 0) {
    return 1;
  }

  var solutionCount = 0;
  var board = new Board({ n : n }); 

  traverseBoard(board, 0, n, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};