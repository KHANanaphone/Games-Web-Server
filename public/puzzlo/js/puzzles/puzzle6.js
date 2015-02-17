PuzzleDefinition.prototype.Puzzle64 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 2;

    this.items = [1331, 1331];
    this.description = "Square";

    this.initialContents = [
        [1000, 1000, 1000, 1000, 1000],
        [1000, 1101, 1101, 1101, 1000],
        [1000, 1101, 1101, 1101, 1000],
        [1000, 1101, 1101, 1101, 1000],
        [1000, 1000, 1000, 1000, 1000],
    ];
};

PuzzleDefinition.prototype.Puzzle65 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 4;

    this.items = [1200];
    this.description = "Weird Item";

    this.initialContents = [
        [1101, 1000, 1000, 1000, 1000],
        [1200, 1102, 1200, 1000, 1000],
        [1200, 1000, 1131, 1000, 1200],
        [1000, 1000, 1000, 1000, 1000],
        [1000, 1201, 1121, 1000, 1331],
    ];
};

PuzzleDefinition.prototype.Puzzle66 = function() {

    this.height = 7;
    this.width = 5;
    this.maxMoves = 3;

    this.items = [1131];
    this.description = "Huh?";

    this.initialContents = [
        [1200, 1122, 1101, 1000, 1200],
        [1000, 1000, 1331, 1200, 1000],
        [1000, 1000, 1200, 1231, 1200],
        [1331, 1000, 1101, 1000, 1331],
        [1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1331, 1000, 1000],
        [1200, 1000, 1000, 1221, 1200],
    ];
};