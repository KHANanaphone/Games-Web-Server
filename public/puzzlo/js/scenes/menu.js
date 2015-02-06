var MenuScene = {
    solved: null
};

MenuScene.Init = function() {

    MenuScene.solved = [];
    
    for(var i = 0; i < 8; i++){
        
        MenuScene.solved[i] = [];
        
        for(var j = 0; j < 8; j++)
            MenuScene.solved[i][j] = 0;
    }
    
    MenuScene.$scene = $('#menu-scene').hide().load('scenes/menu.html', function() {

        var dia = $('#diamond-bg').eq(0);
//        TweenMax.to(dia, 30, {css: {rotation: 360}, ease: Linear.easeNone}).repeat(-1);

        initializeGrid();
        MenuScene.Show();
    });

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
                    .data('x', 8 - j)
                    .data('y', 8 - i)
                    .click(tileClick);

                $row.append($levelTile);
                MenuScene.$levelTiles[i][j] = $levelTile;
            }
        }

        MenuScene.UnlockTile(MenuScene.$levelTiles[7][7], false);
    }

    function tileClick() {

        if ($(this).hasClass('ready')|| $(this).hasClass('completed')) {

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
    
    setTimeout(function(){
        
        var x = 8 - Math.round(id / 10);
        var y = 8 - (id % 10);
        
        MenuScene.solved[x][y] = 1;

        var $tile = MenuScene.$levelTiles[x][y];
        $tile.removeClass('ready').addClass('complete');
        MenuScene.CheckForUnlockableTiles();
        
    }, 500);
}

MenuScene.CheckForUnlockableTiles = function() {

    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            
            if(MenuScene.solved[i][j] == 1)
                continue;
            
            
            //check x
            if(
                (i == 7 || MenuScene.solved[i + 1][j] == 1) &&
                (j == 7 || MenuScene.solved[i][j + 1] == 1)
            )
                unlock(i, j);
        }
    }
    
    function unlock(x, y){
        
        MenuScene.UnlockTile(MenuScene.$levelTiles[x][y]);
    }
}

MenuScene.UnlockTile = function($tile, animate, callback) {

    $tile.addClass('ready');
}