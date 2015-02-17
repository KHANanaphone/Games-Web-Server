//PuzzleDefinition.prototype.Puzzle30 = function() {
//
//    this.height = 7;
//    this.width = 5;
//    this.maxMoves = 2;
//
//    this.description = "Ice and lightning bombs explode differently";
//
//    this.items = [1321, 1311];
//
//    this.initialContents = [
//        [1000, 1101, 1000, 1000, 1000],
//        [1000, 1000, 1101, 1101, 1000],
//        [1000, 1101, 1000, 1000, 1000],
//        [1200, 1200, 1200, 1200, 1200],
//        [1000, 1101, 1000, 1101, 1000],
//        [1000, 1000, 1101, 1000, 1000],
//        [1000, 1000, 1101, 1000, 1000]
//    ];
//};

PuzzleDefinition.prototype.Puzzle31 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 5;

    this.description = "Jail Cell";

    this.initialContents = [
        [1000, 1200, 1000],
        [1201, 1103, 1201],
        [1000, 1201, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle32 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 4;

    this.description = "What a Joke";

    this.initialContents = [
        [1000, 1000, 1111, 1111],
        [1121, 1121, 1111, 1201],
        [1121, 1121, 1201, 1111],
        [1000, 1000, 1111, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle33 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 1;

    this.description = "Bombs explode diagonally when hit.";

    this.initialContents = [
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1101, 1000, 1101, 1000],
        [1000, 1000, 1331, 1000, 1000],
        [1000, 1101, 1000, 1101, 1000],
        [1101, 1000, 1000, 1000, 1101]
    ];
};

PuzzleDefinition.prototype.Puzzle34 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 1;

    this.description = "Click on the board to place an item from your item bar.";
    
    this.items = [1331];

    this.initialContents = [
        [1101, 1000, 1000, 1000, 1000],
        [1101, 1200, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000, 1000],
        [1331, 1000, 1000, 1000, 1101]
    ];
};