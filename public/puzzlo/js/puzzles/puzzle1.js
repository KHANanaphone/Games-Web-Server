PuzzleDefinition.prototype.Puzzle11 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 2;

    this.description = "Click the arrows to destroy all the diamonds";

    this.initialContents = [
        [1000, 1101, 1000],
        [1101, 1102, 1101],
        [1000, 1101, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle12 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 2;

    this.description = "Diamonds can't be damaged by their own color";

    this.initialContents = [
        [1000, 1111, 1000],
        [1000, 1121, 1000],
        [1000, 1111, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle13 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 2;

    this.description = "Solid blocks can't be broken. Hollow blocks can be.";

    this.initialContents = [
        [1000, 1000, 1000],
        [1200, 1101, 1201],
        [1000, 1000, 1000]
    ];
};