function Lightning($tile, isTop){
    
	this.$tile = $tile;
    this.isTop = isTop;
    
    this.x = $tile.attr('x');
    this.y = $tile.attr('y');
    
	$tile.attr('tile-type', 'lightning').css('background-color', '')
    .find('.icon').attr('tile-type', '');
    
    this.DrawContents();
    this.SetupClicking();
}

Lightning.prototype.DrawContents = function(){
    
    var $icon = $('.hidden .lightning-icon').clone();
    
    if(!this.isTop)
        $icon.find('path').attr('transform', 'scale(1, -1) translate(0, -200)');
    
    this.$tile.find('.icon').empty().append($icon);
    
}

Lightning.prototype.SetupClicking = function(){
    
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
        LightningLogic.ShootLightning(self);
    });
}

Lightning.prototype.MakeReady = function(){
    
    this.$tile.attr('ready', 1);
}