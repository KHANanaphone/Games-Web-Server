function PuzzleDefinition(x, y) {

    this.x = x;
    this.y = y;
    this.items = []

    this["Puzzle" + x + y]();

    this.Setup = function() {

        this.movesLeft = this.maxMoves;
        this.contents = this.initialContents.slice();
    }
}