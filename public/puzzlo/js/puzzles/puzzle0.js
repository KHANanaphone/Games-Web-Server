PuzzleDefinition.prototype.Puzzle00 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 2;
    this.tier = 0;

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
    this.tier = 0.1;

    this.description = "Diamonds can't be damaged by their own color";

    this.initialContents = [
        [1000, 1111, 1000],
        [1000, 1121, 1000],
        [1000, 1111, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle10 = function() {

    this.height = 5;
    this.width = 3;
    this.maxMoves = 4;
    this.tier = 0.1;

    this.description = "Blocks will stop one shot, but can be destroyed by other colors.";

    this.initialContents = [
        [1201, 1101, 1101],
        [1200, 1200, 1200],
        [1101, 1211, 1101],
        [1200, 1200, 1200],
        [1101, 1101, 1221],
    ];
};
