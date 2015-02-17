PuzzleDefinition.prototype.Puzzle43 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 3;

    this.description = "Red objects can't be damaged by red bombs.";

    this.initialContents = [
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1231, 1000, 1131, 1000],
        [1000, 1000, 1331, 1000, 1000],
        [1000, 1131, 1000, 1231, 1000],
        [1101, 1000, 1000, 1000, 1101]
    ];
};

PuzzleDefinition.prototype.Puzzle44 = function() {

    this.height = 7;
    this.width = 3;
    this.maxMoves = 2;

    this.items = [1331, 1331];
    this.description = "Mama Mia!";

    this.initialContents = [
        [1101, 1000, 1101],
        [1000, 1000, 1000],
        [1101, 1000, 1101],
        [1000, 1102, 1000],
        [1101, 1000, 1101],
        [1000, 1000, 1000],
        [1101, 1000, 1101],
    ];
};

PuzzleDefinition.prototype.Puzzle45 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 1;

    this.items = [1331, 1331, 1331, 1331, 1331];
    this.description = "Chain Reaction";

    this.initialContents = [
        [1102, 1101, 1000, 1200, 1101],
        [1200, 1102, 1200, 1201, 1200],
        [1000, 1200, 1000, 1200, 1200],
        [1200, 1102, 1200, 1000, 1200],
        [1101, 1200, 1000, 1200, 1102]
    ];
};


PuzzleDefinition.prototype.Puzzle46 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 4;

    this.items = [1331, 1331, 1331, 1331];
    this.description = "Pow";

    this.initialContents = [
        [1101, 1101, 1101, 1101, 1000],
        [1101, 1102, 1000, 1102, 1101],
        [1101, 1000, 1104, 1000, 1101],
        [1101, 1102, 1000, 1102, 1101],
        [1101, 1101, 1101, 1101, 1101]
    ];
};
