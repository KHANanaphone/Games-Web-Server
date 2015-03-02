var TeleporterLogic = {};

TeleporterLogic.CheckTeleporters = function(){
    
    var board = PuzzleScene.board;
    var counts = {t0: [], t1: [], t2: [], t3: []};
    
    for(var i = 0; i < board.length; i++){
        
        for(var j = 0; j < board[i].length; j++){
            
            var tile = board[i][j];
            
            if(tile.type == 'teleporter')
                counts[tile.subtype].push(tile);
        }
    }
    
    if(counts.t0.length == 2){
        counts.t0[0].$tile.find('.icon').addClass('active');
        counts.t0[1].$tile.find('.icon').addClass('active');
    }
    if(counts.t1.length == 2){
        counts.t1[0].$tile.find('.icon').addClass('active');
        counts.t1[1].$tile.find('.icon').addClass('active');
    }
    if(counts.t2.length == 2){
        counts.t2[0].$tile.find('.icon').addClass('active');
        counts.t2[1].$tile.find('.icon').addClass('active');
    }
    if(counts.t3.length == 2){
        counts.t3[0].$tile.find('.icon').addClass('active');
        counts.t3[1].$tile.find('.icon').addClass('active');
    }
}

TeleporterLogic.ApplyLogic = function(action, tile){
    
    var target = getMatchingTeleporter(tile);
    
    if(!target)
        return true;
    else {
        action.x = target.$tile.attr('x');
        action.y = target.$tile.attr('y');
        return false;
    }
        
    function getMatchingTeleporter(tile){
        
        var board = PuzzleScene.board;        
        
        for(var i = 0; i < board.length; i++){
            
            for(var j = 0; j < board[i].length; j++){
                
                var tile2 = board[i][j];
                
                if(tile2.type == 'teleporter' &&
                   tile.subtype == tile2.subtype &&
                   tile !== tile2)
                    return tile2;
            }
        }
        
        return null;
    }
}