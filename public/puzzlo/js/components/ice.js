function Ice($tile, isLeft){
    
	this.$tile = $tile;
    this.isLeft = isLeft;
    
    this.x = $tile.attr('x');
    this.y = $tile.attr('y');
    
	$tile.attr('tile-type', 'ice');
    
    this.DrawContents();
    this.SetupClicking();
}

Ice.prototype.DrawContents = function(){
    
    var $icon = $('.hidden .ice-icon').clone();
    
    if(!this.isLeft)
        $icon.find('polygon').attr('transform', 'scale(-1,1) translate(-20, 0)');
    
    this.$tile.find('.icon').empty().append($icon);
}

Ice.prototype.SetupClicking = function(){
    
    var self = this;
    var $tile = this.$tile;
    
    $tile
    .attr('ready', 1)
    .click(function(){

        if($tile.attr('ready') == 0)
            return;
        else if(PuzzleScene.puzzle.movesLeft <= 0)
            return;
        else if(Timer.running)
            return;
        else if(PuzzleScene.solved)
            return;
        
        $tile.attr('ready', 0);
        IceLogic.ShootIce(self);
    });
}

Ice.prototype.MakeReady = function(){
    
    this.$tile.attr('ready', 1);
}