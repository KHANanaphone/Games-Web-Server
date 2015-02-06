var MenuScene = {};

MenuScene.Init = function() {

    MenuScene.$scene = $('#menu-scene').hide().load('scenes/menu.html', function() {

        var dia = $('#diamond-bg').eq(0);
        //TweenMax.to(dia, 30, {css: {rotation: 360}, ease: Linear.easeNone}).repeat(-1);

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

        if ($(this).hasClass('ready')) {

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
        
        var x = Math.round(id / 10);
        var y = id % 10;

        var $tile = MenuScene.$levelTiles[8 - x][8 - y];
        
        solvAnimComplete($tile);

        function solvAnimComplete($tile) {

            $tile.removeClass('ready').addClass('complete').css('background-color', '');
            MenuScene.CheckForUnlockableTiles();
        }
    }, 800);
}

MenuScene.CheckForUnlockableTiles = function() {

}

MenuScene.UnlockTile = function($tile, animate, callback) {

    if (!animate) {

        $tile.addClass('ready').css('background-color', '');
        return;
    }

    var t1 = new TimelineLite();
    var tile = $tile.eq(0);

    t1.to(tile, 0.6, {
        css: {
            backgroundColor: 'cyan'
        }
    });

    t1.to(tile, 1.2, {
        css: {
            backgroundColor: 'white'
        }
    });

    t1.eventCallback('onComplete', animComplete, [$tile, callback]);
    t1.play();

    function animComplete($tile, callback) {

        $tile.addClass('ready').css('background-color', '');

        if (callback)
            callback();
    }
}