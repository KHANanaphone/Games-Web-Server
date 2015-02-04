//The 'logic' files are basically extensions of PuzzleScene
var IceLogic = {};

IceLogic.ShootIce = function(ice){
    
    Timer.AddAction({
        x: ice.x,
        y: ice.y,
        direction: ice.isLeft ? 'R' : 'L',
        type: 'ice',
        step: IceLogic.Step
    });
    
    Timer.Run();
    
    PuzzleScene.ReduceMovesLeft();
};

IceLogic.Step = function(){
    
    //move
    if(this.direction == 'L')
        this.x--;
    else
        this.x++;
    
    var $tile = PuzzleScene.$tiles[this.y][this.x];
    
    //check boundary, set 'finished' flag if needed
    if($tile.attr('tile-type') != 'board'){
        
        this.finished = true;
        return;
    }
    
    //else do action to tile
    var tile = PuzzleScene.board[$tile.attr('board-y')][$tile.attr('board-x')];
    this.finished = tile.ApplyIce();
}