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

    var nextItemTile = PuzzleScene.nextItemTile;

    if (!nextItemTile)
        return;
    else if (this.value > 0)
        return;

    this.SetContents(nextItemTile.contents);
    nextItemTile.SetContents(1000);
    PuzzleScene.NextItem();
}

Tile.prototype.SetContents = function(contents) {

    this.contents = contents;
    this.type = intToType(Math.round(contents / 100) % 10);
    this.subtype = intToSubtype(Math.round((contents / 10) % 10));
    this.value = Math.round(contents % 10);

    this.DrawContents();

    function intToType(a) {

        if (a == 0)
            return 'blank';
        else if (a == 1)
            return 'diamond';
    }

    function intToSubtype(b) {

        if (b == 0)
            return 'normal';
        else if (b == 1)
            return 'blue';
        else if (b == 2)
            return 'yellow';
        else if (b == 3)
            return 'red';
    }
}

Tile.prototype.DrawContents = function() {

    var $icon = this.$tile.find('.icon').attr('tile-type', 'diamond').empty();

    if (this.type == 'diamond')
        drawDiamond(this.subtype, this.value);

    function drawDiamond(subtype, value) {

        if (value > 0) {

            var $diamond = $('.hidden .diamond-icon').clone();
            $icon.append($diamond);
            $diamond.find('text').html(value);
        }

        if (subtype == 'normal')
            $icon.attr('tile-subtype', 'normal');
        if (subtype == 'blue')
            $icon.attr('tile-subtype', 'ice');
        if (subtype == 'yellow')
            $icon.attr('tile-subtype', 'lit');
        if (subtype == 'red')
            $icon.attr('tile-subtype', 'fire');
    }
}

Tile.prototype.FlashBackground = function(color) {

    var oldColor = this.$tile.css('background-color');

    TweenMax.fromTo(this.$tile, Timer.interval / 1000, {
        css: {
            backgroundColor: color
        }
    }, {
        css: {
            backgroundColor: oldColor
        }
    });
}

//returns whether the lightning gets stopped during the action
Tile.prototype.ApplyLightning = function() {

    if (this.type == 'diamond' && this.value > 0) {

        if (this.subtype == 'yellow')
            return true;

        this.value--;
        this.DrawContents();
    }

    this.FlashBackground('yellow');
    return false;
}

//returns whether the ice gets stopped during the action
Tile.prototype.ApplyIce = function() {

    if (this.type == 'diamond' && this.value > 0) {

        if (this.subtype == 'blue')
            return true;

        this.value--;
        this.DrawContents();
    }

    this.FlashBackground('blue');
    return false;
}