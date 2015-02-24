PuzzleDefinition.prototype.Puzzle27 = function() {

    this.height = 5;
    this.width = 4;
    this.maxMoves = 2;
    
    this.tier = 8;
    this.textID = '8-A';
    this.name = 'Potions';
    this.description = "Potions refill your shots counter once hit.";

    this.initialContents = [
        [1101, 1101, 1101, 1101],
        
        [1101, 1101, 1101, 1101],
        
        [1101, 1101, 1101, 1101],
        
        [1101, 1101, 1101, 1101],
        
        [1000, 1600, 1000, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle36 = function() {

    this.height = 5;
    this.width = 4;
    this.maxMoves = 2;
    
    this.tier = 8.1;
    this.textID = '8-B';
    this.name = 'Poisons';
    this.description = "Poisons drain your shot counter to zero.";

    this.initialContents = [
        [1101, 1101, 1101, 1610],
        
        [1101, 1101, 1101, 1101],
        
        [1101, 1101, 1101, 1101],
        
        [1101, 1101, 1101, 1101],
        
        [1000, 1600, 1000, 1000]
    ];
};