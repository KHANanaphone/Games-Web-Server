PuzzleDefinition.prototype.Puzzle33 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 1;
    
    this.tier = 2;
    this.textID = '2-A';
    this.name = 'Bombs';
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
    
    this.tier = 2.1;
    this.textID = '2-B';
    this.name = 'Items';
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

PuzzleDefinition.prototype.Puzzle43 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 3;
    
    this.tier = 2.2;
    this.textID = '2-C';
    this.name = 'Reds';
    this.description = "Red objects can't be damaged by red bombs.";

    this.initialContents = [
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1231, 1000, 1131, 1000],
        [1000, 1000, 1331, 1000, 1000],
        [1000, 1131, 1000, 1231, 1000],
        [1101, 1000, 1000, 1000, 1101]
    ];
};