function PuzzleDefinition(id) {

    this.id = id;
    this.items = []

    if (id == 11)
        this.Puzzle11();
    else if (id == 12)
        this.Puzzle12();
    
    else if (id == 21)
        this.Puzzle21();
    else if (id == 22)
        this.Puzzle22();

    this.Setup = function() {

        this.movesLeft = this.maxMoves;
        this.contents = this.initialContents.slice();
    }
}