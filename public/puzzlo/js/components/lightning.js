function Lightning($tile, isTop){
    
	this.$tile = $tile;
    this.isTop = isTop;
    
    this.x = $tile.attr('x');
    this.y = $tile.attr('y');
    
	$tile.attr('tile-type', 'lightning');
    
    this.DrawContents();
    this.SetupClicking();
}

Lightning.prototype.DrawContents = function(){
    
    var $icon = $('.hidden .lightning-icon').clone();
    
    if(!this.isTop)
        $icon.find('polygon').attr('transform', 'scale(1, -1) translate(0, -20)');
    
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
        
        $tile.attr('ready', 0);
        LightningLogic.ShootLightning(self);
    });
}

Lightning.prototype.MakeReady = function(){
    
    this.$tile.attr('ready', 1);
}