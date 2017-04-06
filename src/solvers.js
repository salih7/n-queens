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

window.findNRooksSolution = function(n) {
  var solution = null; //fixme
  var matrix = makeBlankBoard(n);

  for (var i = 0; i < n; i++){
    matrix[i][i] = 1;
  }

  solution = matrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  for(var i = 1; i <= n; i++) {
    solutionCount *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var validBoards = [];
  //var invoked = 0;

  if (n !== 0){
    for (var i = 0; i < n; i++) {
      var matrix = makeBlankBoard(n);
      matrix[0][i] = 1;
      solution = subFunc(1);  
      if ( solution !== undefined) {
        break;
      }
    } 
  } else {
    solution = [];
  }

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;


    function subFunc(row) {    
      if(row >= n) {
        return matrix;
      }
      var solt = undefined;
      for (var j = 0; j < n; j++) {
        matrix[row][j] = 1;
        //if(n === 6) invoked++;
        if(validate(matrix)) {
          row++;
          return solt || subFunc(row);
        }
        matrix[row][j] = 0; // 
      }
    }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.makeBlankBoard = function(n) {
  var blankArray = [];
  for (var i = 0; i < n; i++) {
    blankArray.push(new Array(n+1).join('0').split('').map(parseFloat));
  }
  return blankArray;
}

window.validate = function(matrix) { 
  var board = new Board(matrix);
  return !board.hasAnyQueensConflicts();
}