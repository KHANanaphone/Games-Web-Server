//The 'logic' files are basically extensions of PuzzleScene
var LightningLogic = {};

LightningLogic.ShootLightning = function(lightning) {

    Timer.AddAction({
        x: lightning.x,
        y: lightning.y,
        direction: lightning.isTop ? 'D' : 'U',
        type: 'lightning',
        step: LightningLogic.Step
    });

    PuzzleScene.ReduceMovesLeft();
    Timer.Run();

};

LightningLogic.Step = function() {

    //move
    if (this.direction == 'U')
        this.y--;
    else if (this.direction == 'D')
        this.y++;
    else if (this.direction == 'L')
        this.x--;
    else if (this.direction == 'R')
        this.x++;

    var $tile = PuzzleScene.$tiles[this.y][this.x];

    //check boundary, set 'finished' flag if needed
    if (!$tile || $tile.attr('tile-type') != 'board') {

        this.finished = true;
        return;
    }

    //else do action to tile
    var tile = PuzzleScene.board[$tile.attr('board-y')][$tile.attr('board-x')];
    this.finished = LightningLogic.ApplyLightning(this, tile);
}

//returns whether the lightning gets stopped during the action
LightningLogic.ApplyLightning = function(action, tile) {

    tile.FlashBackground('yellow');

    if (tile.type == 'diamond' && tile.value > 0) {

        if (tile.subtype == 'lightning')
            return true;

        tile.value--;
        
        if(tile.value == 0)
            tile.Clear();
        
        tile.DrawContents();
        
    } else if (tile.type == 'block') {

        if (tile.subtype == 'lightning')
            return true;

        if (tile.value > 0)
            tile.Clear();

        return true;
    } else if (tile.type == 'bomb') {

        BombLogic.Detonate(tile);
        tile.Clear();

        return true;
    }else if (tile.type == 'mirror'){
        
        return MirrorLogic.ApplyLogic(action, tile);
    }else if (tile.type == 'potion'){
        
        if(tile.subtype == 'poison')
            PotionLogic.ApplyPoison();
        else
            PotionLogic.ApplyPotion();
        
        tile.Clear();
        return true;
    }else if(tile.type == 'teleporter'){
        
        return TeleporterLogic.ApplyLogic(action, tile);
    }

    return false;
}