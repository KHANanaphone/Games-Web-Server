PuzzleDefinition.prototype.Puzzle10 = function() {

    this.height = 5;
    this.width = 3;
    this.maxMoves = 4;

    this.description = "Blocks will stop one shot, but can be destroyed by other colors.";

    this.initialContents = [
        [1201, 1101, 1101],
        [1200, 1200, 1200],
        [1101, 1211, 1101],
        [1200, 1200, 1200],
        [1101, 1101, 1221],
    ];
};

PuzzleDefinition.prototype.Puzzle11 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 2;

    this.description = "Some diamonds will take more than one shot.";

    this.initialContents = [
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1101, 1000, 1000],
        [1101, 1101, 1102, 1101, 1101],
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1101, 1000, 1000],
    ];
};

PuzzleDefinition.prototype.Puzzle12 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 6;

    this.description = "Zippity Zoo";

    this.initialContents = [
        [1000, 1101, 1101, 1000],
        [1102, 1103, 1103, 1102],
        [1102, 1103, 1103, 1102],
        [1000, 1101, 1101, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle13 = function() {

    this.height = 7;
    this.width = 1;
    this.maxMoves = 4;

    this.description = "Beanpole";

    this.initialContents = [
        [1102],
        [1221],
        [1102],
        [1211],
        [1101],
        [1221],
        [1101]
    ];
};