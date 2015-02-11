function PuzzleDefinition(id) {

    this.id = id;
    this.items = []

    this["Puzzle" + id]();

    this.Setup = function() {

        this.movesLeft = this.maxMoves;
        this.contents = this.initialContents.slice();
    }
}