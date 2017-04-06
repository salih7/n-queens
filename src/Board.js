// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/
    // sum the contents of a particular .get() row
    sumRow: function(rowIndex){
      return this.get(rowIndex).reduce(
        function(retVal,elem){
          retVal += elem;
          return retVal;
        },0);
    },
    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      if(this.sumRow(rowIndex) > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for(var i = 0; i < rows.length; i++) {
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // sum the contents of a particular column in the matrix
    sumCol: function(colIndex){
      return this.rows().reduce(
        function(retVal,row){
        //add the element at colindex to the retVal;
          retVal += row[colIndex];
          return retVal;
      },0);
    },

    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      if (this.sumCol(colIndex)>1){ 
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numOfColumns = this.get(0).length;  // should really be based on 'n' but I guess that's not defined in this scope? 
      for (var i = 0; i < numOfColumns; i++){
        if (this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var matrix = this.rows();
      var limit = ( matrix.length ); // really should be 'n'
      var checkCol = majorDiagonalColumnIndexAtFirstRow; // Starting Column
      var checkRow = 0; // Starts at top
      var sum = 0;
      var mirrorSum = 0;

      while ( (checkRow < limit) && (checkCol < limit) ){
        var mirrorRow = checkCol;
        var mirrorCol = checkRow
        sum += matrix[checkRow][checkCol];
        mirrorSum += matrix[mirrorRow][mirrorCol];
        
        if (sum > 1 || mirrorSum > 1){ return true; }

        checkCol++;
        checkRow++;
      }
      //otherwise...
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numOfColumns = this.get(0).length;  // should really be based on 'n' but I guess that's not defined in this scope? 
      for (var i = 0; i < numOfColumns; i++){
        if (this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var matrix = this.rows();
      var limit = ( matrix.length ); // really should be 'n'
      var trueLimit = limit-1;
      var checkCol = minorDiagonalColumnIndexAtFirstRow; // Starting Column
      var checkRow = 0; 
      var sum = 0;
      var mirrorSum = 0;

      while ( (checkRow < limit ) && (checkCol >= 0) ){
        var mirrorRow = trueLimit - checkCol;
        var mirrorCol = trueLimit - checkRow;
        sum += matrix[checkRow][checkCol];
        mirrorSum += matrix[mirrorRow][mirrorCol];
        
        if (sum > 1 || mirrorSum > 1){ return true; }

        checkCol--;
        checkRow++;
      }
      //otherwise...
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var limit = this.rows().length;  // should really be based on 'n' but I guess that's not defined in this scope? 
      for (var i = 0; i < limit; i++){
        if (this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());



/* NOTES 

Board.rows() = returns all rows
Board.get(x) = returns the single row x (0-indexed)

var rookBoard = new Board([ [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1] ]);
var workingBoard = new Board([ [0, 1, 0, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 0, 1, 0] ]);
var badBoard = new Board([ [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1] ]);
var threeByBoard = new Board ([ [1,0,0] , [0,1,0] , [0,0,1]]);
var badThreeByBoard = new Board ([ [1,0,0] , [1,0,0] , [1,0,0]]);

var blankBoard = new Board([ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]);

var badMajDiagBoard = new Board([ [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]);
var badMinDiagBoard = new Board([ [0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]);
*/