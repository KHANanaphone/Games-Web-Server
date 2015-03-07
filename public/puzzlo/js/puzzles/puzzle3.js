PuzzleDefinition.prototype.Puzzle67 = function() {

    this.height = 7;
    this.width = 3;
    this.maxMoves = 2;
    
    this.tier = 3;
    this.textID = '3-A';
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
    
    this.tier = 3.1;
    this.textID = '3-B';
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
    
    this.tier = 3.2;
    this.textID = '3-C';
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

PuzzleDefinition.prototype.Puzzle78 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 2;
    this.items = [1311, 1311];
    
    this.tier = 3.3;
    this.textID = '3-1';
    this.name = "La Bomba";

    this.initialContents = [
        [1000, 1000, 1000],
        [1103, 1000, 1103],
        [1000, 1000, 1000]
    ];
};  

PuzzleDefinition.prototype.Puzzle79 = function() {

    this.height = 3;
    this.width = 5;
    this.maxMoves = 2;
    this.items = [1331, 1331, 1401, 1401];
    
    this.tier = 3.3;
    this.textID = '3-2';
    this.name = "Shift Happens";

    this.initialContents = [
        [1200, 1000, 1122, 1000, 1200],
        [1200, 1122, 1000, 1000, 1200],
        [1000, 1000, 1122, 1000, 1000]
    ];
};      

PuzzleDefinition.prototype.Puzzle87 = function() {

    this.height = 7;
    this.width = 5;
    this.maxMoves = 1;
    this.items = [1321, 1321, 1321, 1321];
    
    this.tier = 3.3;
    this.textID = '3-3';
    this.name =  "Whateva";

    this.initialContents = [
        [1200, 1200, 1200, 1200, 1200],
        [1000, 1000, 1101, 1000, 1200],
        [1200, 1000, 1000, 1311, 1200],
        [1200, 1311, 1000, 1000, 1200],
        [1200, 1000, 1000, 1311, 1200],
        [1200, 1101, 1200, 1200, 1200],
        [1200, 1200, 1200, 1200, 1200],
    ];
}; 

PuzzleDefinition.prototype.Puzzle88 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 3;
    this.items = [1403, 1400];
    
    this.tier = 3.3;
    this.textID = '3-4';
    this.name = "Shifty";
    
    this.initialContents = [
        [1000, 1000, 1111, 1000],
        [1101, 1101, 1121, 1111],
        [1101, 1101, 1111, 1121],
        [1000, 1000, 1121, 1000]
    ];
};
        
PuzzleDefinition.prototype.Puzzle89 = function() {

    this.height = 7;
    this.width = 5;
    this.maxMoves = 4;
    this.items = [1402, 1402, 1401, 1402];
    
    this.tier = 3.3;
    this.textID = '3-5';
    this.name = "Boggity Boo";

    this.initialContents = [
        [1200, 1200, 1200, 1000, 1000],
        [1200, 1103, 1200, 1221, 1000],
        [1000, 1201, 1000, 1000, 1200],
        [1200, 1201, 1000, 1000, 1200],
        [1200, 1201, 1200, 1000, 1000],
        [1000, 1000, 1000, 1311, 1331],
        [1000, 1000, 1000, 1200, 1000]
    ];
};
        
PuzzleDefinition.prototype.Puzzle97 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 1;
    this.items = [1331, 1311, 1311, 1321, 1321];
    
    this.tier = 3.3;
    this.textID = '3-6';
    this.name =  "Bombo";

    this.initialContents = [
        [1000, 1101, 1101, 1101, 1000],
        [1101, 1000, 1000, 1000, 1101],
        [1102, 1000, 1000, 1000, 1101],
        [1101, 1000, 1000, 1000, 1101],
        [1000, 1101, 1101, 1101, 1000],
    ];
};
        
PuzzleDefinition.prototype.Puzzle98 = function() {

    this.height = 5;
    this.width = 3;
    this.maxMoves = 2;
    this.items = [1331, 1403, 1403, 1403];
    
    this.tier = 3.3;
    this.textID = '3-7';
    this.name =  "Ooh boy";

    this.initialContents = [
        [1000, 1102, 1000],
        [1000, 1000, 1000],
        [1000, 1121, 1200],
        [1000, 1000, 1000],
        [1200, 1102, 1000]
    ];
};
        
PuzzleDefinition.prototype.Puzzle99 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 1;
    this.items = [1311, 1311, 1321, 1331];
    
    this.tier = 3.3;
    this.textID = '3-8';
    this.name =  "Hah";

    this.initialContents = [
        [1200, 1200, 1200, 1000],
        [1200, 1101, 1200, 1000],
        [1200, 1200, 1201, 1000],
        [1000, 1000, 1000, 1000]
    ];
}; 