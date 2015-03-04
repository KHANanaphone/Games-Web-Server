PuzzleDefinition.prototype.Puzzle20 = function() {

    this.height = 7;
    this.width = 5;
    this.maxMoves = 3;

    this.tier = 10;
    this.textID = '10-A';
    this.name = 'Teleporters';
    this.description = "Teleporters transport shots.";

    this.initialContents = [
        [1000, 1000, 1101, 1000, 1000],
        
        [1000, 1000, 1101, 1000, 1000],
        
        [1200, 1101, 1700, 1101, 1101],
        
        [1200, 1200, 1200, 1200, 1200],
        
        [1200, 1101, 1700, 1101, 1101],
        
        [1000, 1000, 1101, 1000, 1000],
        
        [1000, 1000, 1101, 1000, 1000],
    ];
};

PuzzleDefinition.prototype.Puzzle30 = function() {

    this.height = 5;
    this.width = 4;
    this.maxMoves = 1;
    this.items = [1700, 1710, 1720, 1730];

    this.tier = 10;
    this.textID = '10-B';
    this.name = 'Teleporters 2';
    this.description = "There can be multiple types of teleporters, but only up to 2 of each type.";

    this.initialContents = [
        
        [1000, 1101, 1101, 1000],
        
        [1700, 1101, 1101, 1000],
        
        [1710, 1101, 1101, 1000],
        
        [1720, 1101, 1101, 1000],
        
        [1730, 1101, 1101, 1000]
    ];
};