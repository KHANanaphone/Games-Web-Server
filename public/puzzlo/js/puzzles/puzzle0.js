PuzzleDefinition.prototype.Puzzle00 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 2;

    this.description = "Destroy all the diamonds by clicking the arrows.";

    this.initialContents = [
        [1101, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000],
        [1000, 1101, 1101, 1101]
    ];
};

PuzzleDefinition.prototype.Puzzle01 = function() {

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

//PuzzleDefinition.prototype.Puzzle02 = function() {
//
//    this.height = 5;
//    this.width = 5;
//    this.maxMoves = 5;
//
//    this.description = "Large blocks can't be broken. Hollow blocks can be.";
//
//    this.initialContents = [
//        [1102, 1200, 1000, 1200, 1101],
//        [1102, 1200, 1000, 1200, 1101],
//        [1211, 1200, 1201, 1000, 1121],
//        [1101, 1200, 1101, 1200, 1101],
//        [1101, 1200, 1221, 1200, 1101]
//    ];
//};
//
//PuzzleDefinition.prototype.Puzzle03 = function() {
//
//    this.height = 8;
//    this.width = 6;
//    this.maxMoves = 5;
//
//    this.description = "";
//
//    this.initialContents = [
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000],
//        [1000, 1000, 1000, 1000, 1000, 1000]
//    ];
//};