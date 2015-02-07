function PuzzleDefinition(id){
	
    this.id = id;
    this.items = []
    
	if(id == 11)
		this.Puzzle1();
    
    this.Setup = function(){
    
        this.movesLeft = this.maxMoves;
        this.contents = this.initialContents.slice();  
    }
}