var MenuScene = {
    solved: null
};

var SOLVED_NAME = 's5';

MenuScene.Init = function() {

    getSolvedStatus();

    MenuScene.$scene = $('#menu-scene').hide().load('scenes/menu.html', function() {

        var dia = $('#diamond-bg').eq(0);
        //        TweenMax.to(dia, 30, {css: {rotation: 360}, ease: Linear.easeNone}).repeat(-1);

        initializeGrid();
        MenuScene.Show();
    });

    function getSolvedStatus() {

        var solved = localStorage.getItem(SOLVED_NAME);

        if (solved)
            var solvedArray = solved.split(',');

        MenuScene.solved = [];

        for (var i = 0; i < 10; i++) {

            MenuScene.solved[i] = [];

            for (var j = 0; j < 10; j++) {

                if (solvedArray)
                    MenuScene.solved[i][j] = solvedArray[i * 10 + j];
                else
                    MenuScene.solved[i][j] = 0;
            }
        }
    }

    function initializeGrid() {

        var $grid = $('#diamond-menu');
        MenuScene.$levelTiles = [];

        for (var i = 0; i < 10; i++) {

            var $row = $('<div class="level-row"></div>');
            $grid.append($row);

            MenuScene.$levelTiles[i] = [];

            for (var j = 0; j < 10; j++) {

                var $levelTile = $('<div>', {
                    class: 'level-tile'
                })
                    .data('x', i)
                    .data('y', j)
                    .click(tileClick);

                try {
                    
                    var puzz = new PuzzleDefinition(i, j);
                    $levelTile.data('tier', puzz.tier);
                } catch (err) {
                    $levelTile.addClass('noPuzz');
                    //console.log('no puzz ' + i + '-' + j);
                }

                $row.append($levelTile);
                MenuScene.$levelTiles[i][j] = $levelTile;
            }
        }


        MenuScene.CheckForUnlockableTiles();
    }

    function tileClick(event) {        
        
        
        if ($(this).hasClass('ready') || $(this).hasClass('complete')) {

            var x = $(this).data('x');
            var y = $(this).data('y');
            
            if(DEBUG_CTRL){
                
                MenuScene.Solved(x, y, true);
                return;
            }
            
            MenuScene.$scene.fadeOut();
            PuzzleScene.ShowPuzzle(x, y);
        }
    }
};

MenuScene.Show = function() {

    $('#menu-scene').fadeIn();
    $('#puzzle-scene').fadeOut();
};

MenuScene.Solved = function(x, y, fast) {

    if(fast){
        
        updateSolved(x, y);
        return;
    }
    
    $('#main-content').css('background-color', '');
    MenuScene.Show();

    setTimeout(function() {

        updateSolved(x, y);

    }, 500);
    
    function updateSolved(x, y){
        
        MenuScene.solved[x][y] = 1;
        localStorage.setItem(SOLVED_NAME, MenuScene.solved);

        var $tile = MenuScene.$levelTiles[x][y];
        $tile.removeClass('ready').addClass('complete');
        MenuScene.CheckForUnlockableTiles();
    }
}

MenuScene.CheckForUnlockableTiles = function() {

    var tier = 999;
    
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            
            if(MenuScene.solved[i][j] == 0){
                
                var levelTier = MenuScene.$levelTiles[i][j].data('tier');
                
                if(levelTier !== 'undefined' && levelTier < tier)
                    tier = levelTier;
            }
        }
    }
    
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            
            var $lt = MenuScene.$levelTiles[i][j];
            
            if (MenuScene.solved[i][j] == 1)
                $lt.addClass('complete');
            else if($lt.hasClass('noPuzz'))
                continue;
            else if($lt.data('tier') == tier)
                $lt.addClass('ready');
        }
    }
}

function resetSolvedStatuses() {

    localStorage.setItem('solved', null);
    window.reload();
}