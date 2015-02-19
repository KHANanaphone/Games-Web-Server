PuzzleDefinition.prototype.Puzzle67 = function() {

    this.height = 7;
    this.width = 3;
    this.maxMoves = 2;

    this.description = "Yellow and blue bombs explode differently.";

    this.initialContents = [
        [1101, 1000, 1000],
        [1321, 1101, 1101],
        [1101, 1000, 1000],
        [1200, 1200, 1200],
        [1101, 1311, 1101],
        [1000, 1101, 1000],
        [1000, 1101, 1000],
    ];
};
        
PuzzleDefinition.prototype.Puzzle76 = function() {

    this.height = 4;
    this.width = 5;
    this.maxMoves = 1;

    this.description = "Shifters allow you to move the contents of a tile.";
        
    this.items = [1400];

    this.initialContents = [
        [1000, 1000, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000]
    ];
};