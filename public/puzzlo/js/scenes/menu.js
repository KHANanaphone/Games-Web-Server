var MenuScene = {};

MenuScene.Init = function(){
	
	MenuScene.$scene = $('#menu-scene').hide().load('scenes/menu.html');
};


	// var puzzle = new PuzzleDefinition(id);
	// var board = [];
// 	
	// for(var i = 0; i < puzzle.width; i++){
// 		
		// board[i] = [];
// 		
		// for(var j = 0; j < puzzle.height; j++){
// 			
			// board[i][j] = new Tile(puzzle.contents[i][j]); 
// 			
		// }
	// }