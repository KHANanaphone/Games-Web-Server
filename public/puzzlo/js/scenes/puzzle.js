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

            for (var j = 0; j < 9; j++) {

                var $tile = $('<div class="puzzle-tile"><div class="inner"><div class="icon"></div></div></div>');
                $tile.attr('x', j).attr('y', i);
                $row.append($tile);
                PuzzleScene.$tiles[i][j] = $tile;
            }
        }

        PuzzleScene.itemTiles = [];

        for (var x = 0; x < 8; x++) {

            var $clone = $('.hidden .item-tile').clone();
            $('#item-area').append($clone);
            PuzzleScene.itemTiles[x] = new Tile($clone);
        }

        //PuzzleScene.ShowPuzzle(1);
    });
};

PuzzleScene.ShowPuzzle = function(x, y) {

    PuzzleScene.solved = false;
    $('#bottom-buttons .btn').prop('disabled', false);
    $('#success-popup').hide();
    $('#failure-popup').hide();

    var puzzle = new PuzzleDefinition(x,y);

    $('#text-area .text').text(puzzle.description);

    PuzzleScene.puzzleX = x;
    PuzzleScene.puzzleY = y;
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

            $tile
                .attr('tile-type', 'background')
                .css('background-color', '')
                .off('click')
                .find('.icon')
                .empty();
            
            $tile.children().css('background-color', '');
        }
    }
};

PuzzleScene.SetupBoard = function(puzzle) {

    PuzzleScene.puzzle = puzzle;

    var startX = Math.round((8 - puzzle.width) / 2);
    var startY = Math.round((10 - puzzle.height) / 2);
    var width = puzzle.width;
    var height = puzzle.height;

    setIces();
    setLightnings();
    setBoard();
    setMovesMeter();
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

                var tile = new Tile(PuzzleScene.$tiles[startY + j][startX + i], {
                    isBoardTile: true,
                    x: j,
                    y: i
                });
                PuzzleScene.board[i].push(tile);
            }
        }
    };

    function setMovesMeter(){
        
        var max = PuzzleScene.puzzle.maxMoves;
        var $span = $('#shots-icons').empty();
        
        for(var i = 0; i < max; i++){
            $span.append($('.hidden .dot').clone());
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

    $('#main-content').css('background-color', '');
    $('#bottom-area a').fadeIn();
    $('#success-popup').hide();
    $('#failure-popup').hide();
    
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

        for (var j = 0; j < puzzle.height; j++) {
            for (var i = 0; i < puzzle.width; i++) {

                PuzzleScene.board[i][j].SetContents(puzzle.contents[j][i]);
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

        if (nextItem)
            tile.$tile.removeClass('next-item');
        else if (tile.type != 'blank') {
            nextItem = tile;
            tile.$tile.addClass('next-item');
        } else {
            tile.$tile.removeClass('next-item');
        }
    }

    if (nextItem) {

        PuzzleScene.nextItemTile = nextItem;
        $('.puzzle-tile[tile-type="board"]').addClass('clickable');
    } else {

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

    var left = PuzzleScene.puzzle.movesLeft;
    var $span = $('#shots-icons .dot');
    
    $span.each(function(index){
        
        if(left > index)
            $(this).attr('class', 'dot filled');
        else
            $(this).attr('class', 'dot hollow');
    });
    
    $('#moves-left-value').text(PuzzleScene.puzzle.movesLeft);
}

PuzzleScene.SolutionCheck = function() {

    var solved = true;
    var board = PuzzleScene.board;
    var items = PuzzleScene.itemTiles;

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[i].length; j++) {

            if (board[i][j].type == 'diamond' && board[i][j].value > 0)
                solved = false;
        }
    }

    for (var i = 0; i < items.length; i++) {

        if (items[i].type == 'diamond' && items[i].value > 0)
            solved = false;
    }

    if(solved){
        PuzzleScene.solved = true;
        $('#bottom-area a').fadeOut();
        $('#success-popup').fadeIn();
        $('#main-content').css('background-color', 'rgb(149, 218, 149)');
    }
    else if(PuzzleScene.puzzle.movesLeft == 0){
        $('#main-content').css('background-color', 'rgb(241, 170, 170)');
        $('#failure-popup').fadeIn();
    }
}