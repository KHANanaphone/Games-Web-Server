var MirrorLogic = {};

//returns true if action should be finished, false otherwise
MirrorLogic.ApplyLogic = function(action, tile){
    
    var newDir;
    
    if(tile.value == 0){
        
        if(action.direction == 'L') 
            newDir = null
        else if(action.direction == 'R')
            newDir = null;
        else if(action.direction == 'U')
            newDir = 'D';
        else if(action.direction == 'D')
            newDir = 'U';
        else if(action.direction == 'UL')
            newDir = 'DL';
        else if(action.direction == 'UR')
            newDir = 'DR';
        else if(action.direction == 'DL')
            newDir = 'UL';
        else if(action.direction == 'DR')
            newDir = 'UR';
    }
    else if(tile.value == 1){
        
        if(action.direction == 'L') 
            newDir = 'D'
        else if(action.direction == 'R')
            newDir = 'U';
        else if(action.direction == 'U')
            newDir = 'R';
        else if(action.direction == 'D')
            newDir = 'L';
        else if(action.direction == 'UL')
            newDir = 'DR';
        else if(action.direction == 'UR')
            newDir = null;
        else if(action.direction == 'DL')
            newDir = null;
        else if(action.direction == 'DR')
            newDir = 'UL';
    }
    else if(tile.value == 2){
        
        if(action.direction == 'L') 
            newDir = 'R'
        else if(action.direction == 'R')
            newDir = 'L';
        else if(action.direction == 'U')
            newDir = null;
        else if(action.direction == 'D')
            newDir = null;
        else if(action.direction == 'UL')
            newDir = 'UR';
        else if(action.direction == 'UR')
            newDir = 'UL';
        else if(action.direction == 'DL')
            newDir = 'DR';
        else if(action.direction == 'DR')
            newDir = 'DL';
    }
    else if(tile.value == 3){
        
        if(action.direction == 'L') 
            newDir = 'U'
        else if(action.direction == 'R')
            newDir = 'D';
        else if(action.direction == 'U')
            newDir = 'L';
        else if(action.direction == 'D')
            newDir = 'R';
        else if(action.direction == 'UL')
            newDir = null;
        else if(action.direction == 'UR')
            newDir = 'DL';
        else if(action.direction == 'DL')
            newDir = 'UR';
        else if(action.direction == 'DR')
            newDir = null;
    }
    
    if(!newDir){
        
        tile.Clear();
        return true;
    }
    else if(tile.subtype =='splitter'){
                
        //make a copy with the new direction insert if it's a splitter
        
        Timer.AddAction({
        x: action.x,
        y: action.y,
        direction: newDir,
        type: action.type,
        step: action.step
        });
        
        return false;
    }
    else{
        
        action.direction = newDir;
        return false;
    }
}