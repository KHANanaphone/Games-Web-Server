PuzzleDefinition.prototype.Puzzle67 = function() {

    this.height = 7;
    this.width = 3;
    this.maxMoves = 2;
    
    this.tier = 4;
    this.textID = '4-A';
    this.name =  "Other Bombs";
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
    this.items = [1400];
    
    this.tier = 4.1;
    this.textID = '4-B';
    this.name =  "Shifters";
    this.description = "Shifters allow you to move the contents of a tile.";
        

    this.initialContents = [
        [1000, 1000, 1000, 1000, 1000],
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle77 = function() {

    this.height = 5;
    this.width = 4;
    this.maxMoves = 1;
    this.items = [1400];
    
    this.tier = 4.2;
    this.textID = '4-C';
    this.name = 'Push It!';
    this.description = "Shifters can push entire rows of items if they're next to each other.";

    this.initialContents = [
        [1000, 1000, 1000, 1000],
        [1000, 1331, 1101, 1000],
        [1000, 1000, 1201, 1000],
        [1000, 1000, 1101, 1000],
        [1000, 1000, 1000, 1000]
    ];
};