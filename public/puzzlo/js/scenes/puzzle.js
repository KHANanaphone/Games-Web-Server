var PuzzleScene = {
	$tiles : null,
	scene : null,
	board : null,
	shots : {
		left : null,
		right : null,
		top : null,
		botttom : null
	}
};

PuzzleScene.Init = function() {

	PuzzleScene.scene = $('#puzzle-scene').hide().load('scenes/puzzle.html', function() {

		var $board = $('#tiles');
		PuzzleScene.$tiles = [];

		for (var i = 0; i < 11; i++) {

			var $row = $('<div class="puzzle-row"></div>');
			$board.append($row);
			PuzzleScene.$tiles[i] = [];

			for (var j = 0; j < 13; j++) {

				var $tile = $('<div class="puzzle-tile"><div class="inner"><div class="icon"></div></div></div>');
                $tile.attr('x', j).attr('y', i);
				$row.append($tile);
				PuzzleScene.$tiles[i][j] = $tile;
			}
		}
		
		PuzzleScene.ShowPuzzle(1);
	});
};

PuzzleScene.ShowPuzzle = function(id) {
	
	var puzzle = new PuzzleDefinition(id);

	var startX = Math.round((12 - puzzle.width) / 2);
	var startY = Math.round((10 - puzzle.height) / 2);
	var width = puzzle.width;
	var height = puzzle.height;

	PuzzleScene.ResetTiles();
	
	setIces();
	setLightnings();
	setBoard();

    setSkew(puzzle.width, puzzle.height);
    
	PuzzleScene.scene.show();

	function setLightnings() {

		PuzzleScene.shots.top = [];
		PuzzleScene.shots.bottom = [];

		for (var i = 0; i < puzzle.width; i++) {

			var tile = new Lightning(PuzzleScene.$tiles[startY - 1][startX + i]);
			PuzzleScene.shots.top.push(tile);

			var tile2 = new Lightning(PuzzleScene.$tiles[startY + height][startX + i]);
			PuzzleScene.shots.bottom.push(tile2);
		}
	};
	
	function setIces(){
		
		PuzzleScene.shots.left = [];
		PuzzleScene.shots.right = [];

		for (var i = 0; i < puzzle.height; i++) {

			var tile = new Ice(PuzzleScene.$tiles[startY + i][startX - 1]);
			PuzzleScene.shots.left.push(tile);

			var tile2 = new Ice(PuzzleScene.$tiles[startY + i][startX + width]);
			PuzzleScene.shots.right.push(tile2);
		}
	};

	function setBoard() {

		PuzzleScene.board = [];
		
		for (var i = 0; i < puzzle.width; i++){	
			
			PuzzleScene.board[i] = [];
				
			for (var j = 0; j < puzzle.height; j++){
				
				var tile = new Tile(puzzle.contents[i][j], PuzzleScene.$tiles[startY + j][startX + i], i, j);
				PuzzleScene.board[i].push(tile);
			}
		}
	};

    function setSkew(x, y){
        
        var $tiles = $('#tiles');
        
        if(x % 2 == 0)
            $tiles.attr('skew-x', 0);
        else
            $tiles.attr('skew-x', 1);
        
        if(y % 2 == 0)
            $tiles.attr('skew-y', 0);
        else
            $tiles.attr('skew-y', 1);
    }
}; 

PuzzleScene.ResetTiles = function(){
	
	for(var i = 0; i < PuzzleScene.$tiles.length; i++){
		
		var row = PuzzleScene.$tiles[i];
		
		for(var j = 0; j < row.length; j++){
			
			var $tile = row[j];
                        
			$tile.attr('tile-type', 'background');
            $tile.find('.icon').empty();
		}
	}
};
