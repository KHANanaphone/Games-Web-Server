function Ice($tile){
    
	this.$tile = $tile;
	
	$tile.attr('tile-type', 'ice');
    
    var $icon = $('.hidden .ice-icon').clone();
    
    $tile.find('.icon').empty().append($icon);
}
