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
            
        for (var i = 0; i < 10; i++) {

            MenuScene.solved[i] = [];

            for (var j = 0; j < 10; j++){
                
                if(solvedArray)
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
                
                try{
                    var puzz = new PuzzleDefinition(i, j); 
                }  
                catch(err){
                    $levelTile.addClass('noPuzz');
                    //console.log('no puzz ' + i + '-' + j);
                }              

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
            PuzzleScene.ShowPuzzle(x, y);
        }
    }
};

MenuScene.Show = function() {

    $('#menu-scene').fadeIn();
    $('#puzzle-scene').fadeOut();
};

MenuScene.Solved = function(x, y) {

    MenuScene.Show();

    setTimeout(function() {

        
        MenuScene.solved[x][y] = 1;
        localStorage.setItem('solved', MenuScene.solved);

        var $tile = MenuScene.$levelTiles[x][y];
        $tile.removeClass('ready').addClass('complete');
        MenuScene.CheckForUnlockableTiles();

    }, 500);
}

MenuScene.CheckForUnlockableTiles = function() {

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {

            if (MenuScene.solved[i][j] == 1)
                MenuScene.$levelTiles[i][j].addClass('complete');
            
            if (MenuScene.$levelTiles[i][j].hasClass('noPuzz'))
                continue;

            if(solvedOrNull(i-1, j) && solvedOrNull(i,j-1))
                unlock(i, j);
        }
    }

    function unlock(x, y) {

        var puzz = new PuzzleDefinition(x, y); 
        MenuScene.UnlockTile(MenuScene.$levelTiles[x][y]); 
    }
    
    function solvedOrNull(x, y){
        
        if(x < 0 || x > 9 || y < 0 || y > 9)
            return true;
        
        if(MenuScene.$levelTiles[x][y].hasClass('noPuzz'))
            return true;
        
        if(MenuScene.solved[x][y] == 1)
            return true;
        
        return false;
    }
}

MenuScene.UnlockTile = function($tile, animate, callback) {

    $tile.addClass('ready');
}

function resetSolvedStatuses(){
    
    localStorage.setItem('solved', null);
    window.reload();
}