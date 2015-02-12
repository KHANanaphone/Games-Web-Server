PuzzleDefinition.prototype.Puzzle10 = function() {

    this.height = 4;
    this.width = 3;
    this.maxMoves = 1;

    this.description = "Click on an empty space to place an item from the bar below";

    this.items = [1101, 1101];

    this.initialContents = [
        [1000, 1101, 1000],
        [1000, 1000, 1000],
        [1000, 1000, 1000],
        [1000, 1101, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle11 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 4;

    this.description = "Zippity Zoo";

    this.items = [1121, 1111, 1121, 1111];

    this.initialContents = [
        [1101, 1101, 1101],
        [1101, 1000, 1102],
        [1101, 1000, 1101]
    ];
};

PuzzleDefinition.prototype.Puzzle12 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 4;

    this.description = "Zippity Zoo";

    this.initialContents = [
        [1200, 1200, 1111, 1111],
        [1121, 1121, 1111, 1201],
        [1121, 1121, 1201, 1111],
        [1200, 1200, 1111, 1200],
    ];
};