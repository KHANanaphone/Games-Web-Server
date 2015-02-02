function Tile($tile, x, y){
	
	this.$tile = $tile;
	this.x = x;
	this.y = y;

	$tile.attr('tile-type', 'board');
    $tile.attr('board-x', x);
    $tile.attr('board-y', y);
	
	if((x + y) % 2 == 0){
		$tile.addClass('even')
			.removeClass('odd');
	}
	else{
		$tile.addClass('odd')
			.removeClass('even');
	}
}

Tile.prototype.SetContents = function(contents){
    
    this.contents = contents;
    this.DrawContents();
}

Tile.prototype.DrawContents = function(){
    
    var $icon = this.$tile.find('.icon').attr('tile-type', 'diamond');
    var contents = this.contents;
    
    var type = Math.round(contents / 100) % 10;
    var subtype = Math.round((contents / 10) % 10);
    var value = Math.round(contents % 10);
    
    if(type == 0)
        drawDiamond(subtype, value);

    function drawDiamond(subtype, value){
        
        if(value > 0){
            
            var $diamond = $('.hidden .diamond-icon').clone();
            $icon.empty().append($diamond);
            $diamond.find('text').html(value);
        }
        
        if(subtype == 0)
            $icon.attr('tile-subtype', 'normal');
        if(subtype == 1)
            $icon.attr('tile-subtype', 'ice');
        if(subtype == 2)
            $icon.attr('tile-subtype', 'lit');
        if(subtype == 3)
            $icon.attr('tile-subtype', 'fire');
    }
}

