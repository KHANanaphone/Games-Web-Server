PuzzleDefinition.prototype.Puzzle02 = function() {

    this.height = 6;
    this.width = 5;
    this.maxMoves = 5;
    
    this.tier = 6;
    this.textID = '6-A';
    this.name = 'Mirrors';
    this.description = "Mirrors reflect shots. They can be destroyed by hitting them on the side.";

    this.initialContents = [
        [1000, 1111, 1102, 1121, 1000],
        
        [1111, 1501, 1500, 1503, 1121],
        
        [1200, 1200, 1200, 1200, 1200],
        
        [1101, 1000, 1502, 1000, 1101],
        
        [1000, 1000, 1101, 1000, 1000],
        
        [1000, 1000, 1101, 1000, 1000],
    ];
};

PuzzleDefinition.prototype.Puzzle03 = function() {

    this.height = 6;
    this.width = 6;
    this.maxMoves = 1;
        
    this.tier = 6.1;
    this.textID = '6-B';
    this.name = 'Splitters'
    this.description = "Splitters are like mirrors, but the initial shot continues through.";

    this.initialContents = [
        [1102, 1102, 1513, 1101, 1101, 1101],
        
        [1000, 1000, 1102, 1000, 1000, 1000],
        
        [1000, 1000, 1102, 1000, 1000, 1000],
        
        [1000, 1000, 1510, 1000, 1000, 1000],
        
        [1000, 1000, 1101, 1000, 1000, 1000],
        
        [1000, 1000, 1101, 1000, 1000, 1000],
    ];
};