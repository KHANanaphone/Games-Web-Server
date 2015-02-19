/*

types:
0 - nothing
1 - diamond

subtypes:
0 - normal
1 - blue
2 - yellow
3 - red

*/

function Tile($tile, properties) {

    if (!properties)
        properties = {};

    this.$tile = $tile;
    var self = this;

    $tile.attr('tile-type', 'board');

    if (properties.isBoardTile) {

        this.x = properties.x;
        this.y = properties.y;

        $tile.attr('board-x', this.x);
        $tile.attr('board-y', this.y);

        if ((this.x + this.y) % 2 == 0) {
            $tile.addClass('even')
                .removeClass('odd');
        } else {
            $tile.addClass('odd')
                .removeClass('even');
        }

        $tile.click(
            function() {
                self.Clicked();
            });
    };
}

Tile.prototype.Clicked = function() {

    if (Timer.running)
        return;

    var nextItemTile = PuzzleScene.nextItemTile;

    if (!nextItemTile)
        return;
    else if (nextItemTile.type == 'shifter'){
        ShifterLogic.DoShift(nextItemTile, this);
    }
    else if (this.value > 0)
        return;
    else {
        this.SetContents(nextItemTile.contents);
        nextItemTile.SetContents(1000);
        PuzzleScene.NextItem();
    }
}

Tile.prototype.SetContents = function(contents) {

    this.contents = contents;
    this.type = intToType(Math.round(contents / 100) % 10);
    this.subtype = intToSubtype(this.type, Math.round((contents / 10) % 10));
    this.value = Math.round(contents % 10);

    this.DrawContents();

    function intToType(a) {

        if (a == 0)
            return 'blank';
        else if (a == 1)
            return 'diamond';
        else if (a == 2)
            return 'block';
        else if (a == 3)
            return 'bomb';
        else if (a == 4)
            return 'shifter';
    }

    function intToSubtype(t, b) {

        if (b == 0)
            return 'normal';
        else if (b == 1)
            return 'ice';
        else if (b == 2)
            return 'lightning';
        else if (b == 3)
            return 'fire';
    }
}

Tile.prototype.DrawContents = function() {

    var $inner = this.$tile.find('.inner').css('background-color', '');
    var $icon = this.$tile.find('.icon').empty().attr('tile-type', this.type);

    if (this.type == 'diamond')
        drawDiamond(this.value);
    else if (this.type == 'block')
        drawBlock(this.value);
    else if (this.type == 'bomb')
        drawBomb();
    else if (this.type == 'shifter')
        drawShifter();

    if (this.subtype == 'normal')
        $icon.attr('tile-subtype', 'normal');
    if (this.subtype == 'ice')
        $icon.attr('tile-subtype', 'ice');
    if (this.subtype == 'lightning')
        $icon.attr('tile-subtype', 'lightning');
    if (this.subtype == 'fire')
        $icon.attr('tile-subtype', 'fire');

    function drawDiamond(value) {

        if (value > 0) {

            var $diamond = $('.hidden .diamond-icon').clone();
            $icon.append($diamond);
            $diamond.find('text').html(value);
        }
    };

    function drawBlock(value) {

        if (value > 0) {
            var $block = $('.hidden .breakable-block-icon').clone();
        } else {
            $inner.css('background-color', 'black');
        }

        $icon.append($block);
    };

    function drawBomb(value) {

        var $bomb = $('.hidden .bomb-icon').clone();
        $icon.append($bomb);
    };

    function drawShifter() {

        var $shifter = $('.hidden .shifter-icon').clone();
        $icon.append($shifter);
    };
}

Tile.prototype.FlashBackground = function(color) {

    var $tile = this.$tile;
    var oldColor = $tile.css('background-color');

    TweenMax.fromTo($tile, Timer.interval / 500, {
        css: {
            backgroundColor: color
        }
    }, {
        css: {
            backgroundColor: oldColor
        },
        onComplete: function() {
            $tile.css('background-color', '');
        }
    });
}

Tile.prototype.Clear = function() {

    this.value = 0;
    this.type = 'blank';
    this.DrawContents();
}