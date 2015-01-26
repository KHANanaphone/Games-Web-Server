function Lightning($tile){
	
	this.$tile = $tile;
	
	$tile.attr('tile-type', 'lightning');   
    
    var $icon = $('.hidden .lightning-icon').clone();
    
    $tile.find('.icon').empty().append($icon);
}
