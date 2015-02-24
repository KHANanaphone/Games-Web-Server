
PuzzleDefinition.prototype.Puzzle11 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 2;
    
    this.tier = 1;
    this.textID = '1-A';
    this.name = "Cross";
    this.description = "Some diamonds will take more than one shot.";

    this.initialContents = [
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1101, 1000, 1000],
        [1101, 1101, 1102, 1101, 1101],
        [1000, 1000, 1101, 1000, 1000],
        [1000, 1000, 1101, 1000, 1000],
    ];
};

PuzzleDefinition.prototype.Puzzle12 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 6;
         
    this.tier = 1;
    this.textID = '1-B';
    this.name = "Zippity Zoo";

    this.initialContents = [
        [1000, 1101, 1101, 1000],
        [1102, 1103, 1103, 1102],
        [1102, 1103, 1103, 1102],
        [1000, 1101, 1101, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle13 = function() {

    this.height = 7;
    this.width = 1;
    this.maxMoves = 4;
    
    this.tier = 1;
    this.textID = '1-C';
    this.name = "Beanpole";

    this.initialContents = [
        [1102],
        [1221],
        [1102],
        [1211],
        [1101],
        [1221],
        [1101]
    ];
};

PuzzleDefinition.prototype.Puzzle21 = function() {

    this.height = 3;
    this.width = 4;
    this.maxMoves = 4;
    
    this.tier = 1;
    this.textID = '1-D';
    this.name = "EZ Game";

    this.initialContents = [
        [1101, 1211, 1101, 1000],
        [1000, 1000, 1000, 1000],
        [1000, 1103, 1221, 1101]
    ];
};

PuzzleDefinition.prototype.Puzzle22 = function() {

    this.height = 5;
    this.width = 5;
    this.maxMoves = 7;
    
    this.tier = 1;
    this.textID = '1-E';
    this.name = "Uh Oh";

    this.initialContents = [
        [1201, 1000, 1000, 1200, 1200],
        [1201, 1201, 1000, 1200, 1200],
        [1000, 1201, 1201, 1200, 1200],
        [1000, 1000, 1201, 1101, 1200],
        [1200, 1200, 1200, 1200, 1200]
    ];
};

PuzzleDefinition.prototype.Puzzle23 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 4;
    
    this.tier = 1;
    this.textID = '1-F';
    this.name = "Shuriken";

    this.initialContents = [
        [1000, 1101, 1000, 1000],
        [1000, 1201, 1201, 1101],
        [1101, 1201, 1102, 1000],
        [1000, 1000, 1101, 1000],
    ];
};
        
PuzzleDefinition.prototype.Puzzle31 = function() {

    this.height = 3;
    this.width = 3;
    this.maxMoves = 5;
        
    this.tier = 1;
    this.textID = '1-G';
    this.name =  "Jail Cell";

    this.initialContents = [
        [1000, 1200, 1000],
        [1201, 1103, 1201],
        [1000, 1201, 1000]
    ];
};

PuzzleDefinition.prototype.Puzzle32 = function() {

    this.height = 4;
    this.width = 4;
    this.maxMoves = 4;
    
    this.tier = 1;
    this.textID = '1-H';
    this.name =  "What a Joke";

    this.initialContents = [
        [1000, 1000, 1111, 1111],
        [1121, 1121, 1111, 1201],
        [1121, 1121, 1201, 1111],
        [1000, 1000, 1111, 1000]
    ];
};