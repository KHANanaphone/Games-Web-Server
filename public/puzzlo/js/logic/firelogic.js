var FireLogic = {};

FireLogic.Step = function(){
    
    //move
    if (this.direction == 'UL'){
        this.y--; this.x--;
    }
    else if (this.direction == 'UR'){
        this.y--; this.x++;
    }
    else if (this.direction == 'DL'){
        this.y++; this.x--;
    }
    else if (this.direction == 'DR'){
        this.y++; this.x++;     
    }
    
    var $tile = PuzzleScene.$tiles[this.y][this.x];

    //check boundary, set 'finished' flag if needed
    if (!$tile || $tile.attr('tile-type') != 'board') {

        this.finished = true;
        return;
    }

    //else do action to tile
    var tile = PuzzleScene.board[$tile.attr('board-y')][$tile.attr('board-x')];
    this.finished = FireLogic.ApplyFire(this, tile);
};

//returns whether the lightning gets stopped during the action
FireLogic.ApplyFire = function(action, tile) {

    tile.FlashBackground('red');

    if (tile.type == 'diamond' && tile.value > 0) {

        if (tile.subtype == 'fire')
            return true;

        tile.value--;
        
        if(tile.value == 0)
            tile.Clear();
        
        tile.DrawContents();
        
    } else if (tile.type == 'block') {

        if (tile.subtype == 'fire')
            return true;

        if (tile.value > 0)
            tile.Clear();

        return true;
    } else if (tile.type == 'bomb') {

        BombLogic.Detonate(tile);
        tile.Clear();

        return true;
    } else if (tile.type == 'mirror'){
        
        return MirrorLogic.ApplyLogic(action, tile);
    }else if (tile.type == 'potion'){
        
        if(tile.subtype == 'poison')
            PotionLogic.ApplyPoison();
        else
            PotionLogic.ApplyPotion();
        
        tile.Clear();
        return true;
    } else if(tile.type == 'teleporter'){
        
        return TeleporterLogic.ApplyLogic(action, tile);
    }


    return false;
}