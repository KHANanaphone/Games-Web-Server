var MenuScene = {
    solved: null
};

MenuScene.Init = function() {

    getSolvedStatus();

    MenuScene.$scene = $('#menu-scene').hide().load('scenes/menu.html', function() {

        var dia = $('#diamond-bg').eq(0);
        //        TweenMax.to(dia, 30, {css: {rotation: 360}, ease: Linear.easeNone}).repeat(-1);

        initializeGrid();
        MenuScene.Show();
    });
    
    function getSolvedStatus() {
    
        var solved = localStorage.getItem('solved');
        
        if(solved)
            var solvedArray = solved.split(',');        

        MenuScene.solved = [];        
            
        for (var i = 0; i < 8; i++) {

            MenuScene.solved[i] = [];

            for (var j = 0; j < 8; j++){
                
                if(solvedArray)
                    MenuScene.solved[i][j] = solvedArray[i * 8 + j];
                else
                    MenuScene.solved[i][j] = 0; 
            }
        }
    }

    function initializeGrid() {

        var $grid = $('#diamond-menu');
        MenuScene.$levelTiles = [];

        for (var i = 0; i < 8; i++) {

            var $row = $('<div class="level-row"></div>');
            $grid.append($row);

            MenuScene.$levelTiles[i] = [];

            for (var j = 0; j < 8; j++) {

                var $levelTile = $('<div>', {
                    class: 'level-tile'
                })
                    .data('x', 8 - i)
                    .data('y', 8 - j)
                    .click(tileClick);

                $row.append($levelTile);
                MenuScene.$levelTiles[i][j] = $levelTile;
            }
        }
        

        MenuScene.CheckForUnlockableTiles();
    }

    function tileClick() {

        if ($(this).hasClass('ready') || $(this).hasClass('complete')) {

            var x = $(this).data('x');
            var y = $(this).data('y');

            MenuScene.$scene.fadeOut();
            PuzzleScene.ShowPuzzle(x * 10 + y);
        }
    }
};

MenuScene.Show = function() {

    $('#menu-scene').fadeIn();
    $('#puzzle-scene').fadeOut();
};

MenuScene.Solved = function(id) {

    MenuScene.Show();

    setTimeout(function() {

        var x = 8 - (id % 10);
        var y = 8 - Math.round(id / 10);

        MenuScene.solved[y][x] = 1;
        localStorage.setItem('solved', MenuScene.solved);

        var $tile = MenuScene.$levelTiles[y][x];
        $tile.removeClass('ready').addClass('complete');
        MenuScene.CheckForUnlockableTiles();

    }, 500);
}

MenuScene.CheckForUnlockableTiles = function() {

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            if (MenuScene.solved[i][j] == 1)
                MenuScene.$levelTiles[i][j].addClass('complete');


            //check x
            if (
                (i == 7 || MenuScene.solved[i + 1][j] == 1) &&
                (j == 7 || MenuScene.solved[i][j + 1] == 1)
            )
                unlock(i, j);
        }
    }

    function unlock(x, y) {

        MenuScene.UnlockTile(MenuScene.$levelTiles[x][y]);
    }
}

MenuScene.UnlockTile = function($tile, animate, callback) {

    $tile.addClass('ready');
}