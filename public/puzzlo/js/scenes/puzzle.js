var PuzzleScene = {
    $tiles: null,
    itemTiles: null,
    scene: null,
    board: null,
    puzzle: null,
    shots: {
        left: null,
        right: null,
        top: null,
        botttom: null
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

        PuzzleScene.itemTiles = [];

        for (var x = 0; x < 8; x++) {

            var $clone = $('.hidden .item-tile').clone();
            $('#bottom-item-row').append($clone);
            PuzzleScene.itemTiles[x] = new Tile($clone);
        }

        //PuzzleScene.ShowPuzzle(1);
    });
};

PuzzleScene.ShowPuzzle = function(id) {

    PuzzleScene.solved = false;
    $('#bottom-buttons .btn').prop('disabled', false);
    $('#btn-success').hide();

    var puzzle = new PuzzleDefinition(id);

    $('#text-area').text(puzzle.description);

    PuzzleScene.puzzleId = id;
    PuzzleScene.ResetTiles();
    PuzzleScene.SetupBoard(puzzle);
    PuzzleScene.SetupPuzzle(puzzle);

    $('#menu-scene').fadeOut();
    $('#puzzle-scene').fadeIn();
};

PuzzleScene.ResetTiles = function() {

    for (var i = 0; i < PuzzleScene.$tiles.length; i++) {

        var row = PuzzleScene.$tiles[i];

        for (var j = 0; j < row.length; j++) {

            var $tile = row[j];

            $tile.attr('tile-type', 'background');
            $tile.find('.icon').empty();
        }
    }
};

PuzzleScene.SetupBoard = function(puzzle) {

    PuzzleScene.puzzle = puzzle;

    var startX = Math.round((12 - puzzle.width) / 2);
    var startY = Math.round((10 - puzzle.height) / 2);
    var width = puzzle.width;
    var height = puzzle.height;

    setIces();
    setLightnings();
    setBoard();
    setSkew(puzzle.width, puzzle.height);

    function setLightnings() {

        PuzzleScene.shots.top = [];
        PuzzleScene.shots.bottom = [];

        for (var i = 0; i < puzzle.width; i++) {

            var tile = new Lightning(PuzzleScene.$tiles[startY - 1][startX + i], true);
            PuzzleScene.shots.top.push(tile);

            var tile2 = new Lightning(PuzzleScene.$tiles[startY + height][startX + i], false);
            PuzzleScene.shots.bottom.push(tile2);
        }
    };

    function setIces() {

        PuzzleScene.shots.left = [];
        PuzzleScene.shots.right = [];

        for (var i = 0; i < puzzle.height; i++) {

            var tile = new Ice(PuzzleScene.$tiles[startY + i][startX - 1], true);
            PuzzleScene.shots.left.push(tile);

            var tile2 = new Ice(PuzzleScene.$tiles[startY + i][startX + width], false);
            PuzzleScene.shots.right.push(tile2);
        }
    };

    function setBoard() {

        PuzzleScene.board = [];

        for (var i = 0; i < puzzle.width; i++) {

            PuzzleScene.board[i] = [];

            for (var j = 0; j < puzzle.height; j++) {

                var tile = new Tile(PuzzleScene.$tiles[startY + i][startX + j], {
                    isBoardTile: true,
                    x: j,
                    y: i
                });
                PuzzleScene.board[i].push(tile);
            }
        }
    };

    function setSkew(x, y) {


        var $tiles = $('#tiles');

        if (x % 2 == 0)
            $tiles.attr('skew-x', 0);
        else
            $tiles.attr('skew-x', 1);

        if (y % 2 == 0)
            $tiles.attr('skew-y', 0);
        else
            $tiles.attr('skew-y', 1);
    }
}

PuzzleScene.SetupPuzzle = function() {

    var puzzle = PuzzleScene.puzzle;

    puzzle.Setup();
    PuzzleScene.UpdateMovesLeft();

    setupShots();
    setupBoard();
    setupItems();

    function setupShots() {

        for (var i = 0; i < puzzle.width; i++) {

            PuzzleScene.shots.top[i].MakeReady();
            PuzzleScene.shots.bottom[i].MakeReady();
        }

        for (var i = 0; i < PuzzleScene.puzzle.height; i++) {

            PuzzleScene.shots.left[i].MakeReady();
            PuzzleScene.shots.right[i].MakeReady();
        }
    };

    function setupBoard() {

        for (var i = 0; i < puzzle.width; i++) {
            for (var j = 0; j < puzzle.height; j++) {

                PuzzleScene.board[i][j].SetContents(puzzle.contents[i][j]);
            }
        }
    };

    function setupItems() {

        for (var i = 0; i < puzzle.items.length; i++) {

            var item = puzzle.items[i];
            var tile = PuzzleScene.itemTiles[i];

            tile.SetContents(item);
        }

        for (; i < 8; i++) {

            var tile = PuzzleScene.itemTiles[i];
            tile.SetContents(1000);
        }

        PuzzleScene.NextItem();
    };
}

PuzzleScene.NextItem = function() {

    var nextItem = null;

    for (var i = 0; i < PuzzleScene.itemTiles.length; i++) {

        var tile = PuzzleScene.itemTiles[i];

        if(nextItem)
            tile.$tile.removeClass('next-item');
        
        if(tile.type != 'blank'){
            nextItem = tile;
            tile.$tile.addClass('next-item');
        }
        else{
            tile.$tile.removeClass('next-item');
        }
    }
    
    if(nextItem){
        
        PuzzleScene.nextItemTile = nextItem;
        $('.puzzle-tile[tile-type="board"]').addClass('clickable');
    }
    else{
        
        PuzzleScene.nextItemTile = null;
        $('.puzzle-tile').removeClass('clickable');
    }
}

PuzzleScene.RetryClicked = function() {

    PuzzleScene.SetupPuzzle(PuzzleScene.puzzle);
    Timer.Stop();
};

PuzzleScene.ReduceMovesLeft = function() {

    PuzzleScene.puzzle.movesLeft--;
    PuzzleScene.UpdateMovesLeft();
}

PuzzleScene.UpdateMovesLeft = function() {

    $('#moves-left-value').text(PuzzleScene.puzzle.movesLeft);
}

PuzzleScene.SolutionCheck = function() {

    var board = PuzzleScene.board;

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[i].length; j++) {

            if (board[i][j].type == 'diamond' && board[i][j].value > 0)
                return;
        }
    }

    PuzzleScene.solved = true;
    $('#bottom-buttons .btn-default').prop('disabled', true);
    $('#btn-success').show();
}