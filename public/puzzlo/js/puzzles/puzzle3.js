PuzzleDefinition.prototype.Puzzle31 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 2;

    this.description = "Bombs explode when hit";

    this.items = [1331];
    
    this.initialContents = [
        [1000,1000,1331,1000,1000],
        [1000,1103,1000,1103,1000],
        [1331,1000,1000,1000,1331],
        [1000,1103,1000,1103,1000],
        [1000,1000,1331,1000,1000]
    ];
};

PuzzleDefinition.prototype.Puzzle32 = function() {

    this.height = 5;
    this.width = 9;
    this.maxMoves = 2;

    this.description = "Clever description here";

    this.items = [1331,1331];
    
    this.initialContents = [
        [1000,1000,1000,1000,1000,1000,1000,1000,1000],
        [1000,1101,1000,1101,1000,1101,1000,1101,1000],
        [1101,1000,1000,1000,1102,1000,1000,1000,1101],
        [1000,1101,1000,1101,1000,1101,1000,1101,1000],
        [1000,1000,1000,1000,1000,1000,1000,1000,1000]
    ];
};

PuzzleDefinition.prototype.Puzzle33 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 4;

    this.description = "Clever description here";

    this.items = [1200];
    
    this.initialContents = [
        [1101,1000,1000,1000,1000],
        [1000,1102,1200,1000,1000],
        [1200,1000,1131,1000,1200],
        [1000,1000,1000,1000,1000],
        [1000,1201,1121,1000,1331]
    ];
};