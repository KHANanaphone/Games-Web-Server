var ShifterLogic = {};

ShifterLogic.DoShift = function(nextItemTile, targetTile) {

    var direction = nextItemTile.value;

    if (!shift(direction, targetTile))
        return;
    
    nextItemTile.SetContents(1000);
    PuzzleScene.NextItem();


    function shift(direction, targetTile) {

        //invalid shifts, can't shift a black square or a blank tile
        if (targetTile.type == 'blank' ||
            (targetTile.type == 'block' && targetTile.value == 0)) {

            return;
        };
        
        
        var x = targetTile.x;
        var y = targetTile.y;
        
        if(direction == 0) y--;
        else if(direction == 1) x++;
        else if(direction == 2) y++;
        else if(direction == 3) x--;
        
        try{
            
            var nextTile = PuzzleScene.board[y][x];

            if(!nextTile)
                return false;
            else{

                if(nextTile.type == 'blank' || 
                   shift(direction, nextTile)){
                    
                    nextTile.SetContents(targetTile);
                    targetTile.SetContents(1000);
                    TeleporterLogic.CheckTeleporters();
                    return true;
                }
                else 
                    return false;
            }
        }
        catch(e) {
            return false;
        }
    }
}