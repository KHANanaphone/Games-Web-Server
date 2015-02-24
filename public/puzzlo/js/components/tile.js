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
};

Tile.prototype.Clicked = function() {

    //    if (Timer.running)
    //        return;

    var nextItemTile = PuzzleScene.nextItemTile;

    
    if (!nextItemTile)
        return;
    else if (nextItemTile.type == 'shifter') {
        ShifterLogic.DoShift(nextItemTile, this);
    } else if (this.type != 'blank')
        return;
    else {
        this.SetContents(nextItemTile);
        nextItemTile.SetContents(1000);
        PuzzleScene.NextItem();
    }
}

Tile.prototype.SetContents = function(contents) {

    if (typeof contents === 'object') {
        this.type = contents.type;
        this.subtype = contents.subtype;
        this.value = contents.value;
    } else {
        this.type = intToType(Math.floor(contents / 100) % 10);
        this.subtype = intToSubtype(this.type, Math.floor((contents / 10) % 10));
        this.value = Math.floor(contents % 10);
    }


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
        else if (a == 5)
            return 'mirror';
    }

    function intToSubtype(t, b) {

        if (t == 'mirror') {

            if (b == 0)
                return 'normal';
            else
                return 'splitter';
        }

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
        drawShifter(this.value);
    else if (this.type == 'mirror')
        drawMirror(this.subtype, this.value);

    $icon.attr('tile-subtype', this.subtype);

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

    function drawShifter(value) {

        var $shifter = $('.hidden .shifter-icon').clone();
        $shifter.find('polygon').attr('transform', 'rotate(' + (90 * value) + ',100,75)');
        $icon.append($shifter);
    };

    function drawMirror(subtype, value) {

        var $mirror = $('.hidden .mirror-icon').clone();
        $mirror.find('polygon').attr('transform', 'rotate(' + (-45 * value) + ',100,100)');
        $icon.append($mirror);
    }
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