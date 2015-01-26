function Tile(contents, $tile, x, y){
	
	this.contents = contents;
	this.$tile = $tile;
	this.x = x;
	this.y = y;

	$tile.attr('tile-type', 'board');
	
	if((x + y) % 2 == 0){
		$tile.addClass('even')
			.removeClass('odd');
	}
	else{
		$tile.addClass('odd')
			.removeClass('even');
	}
}
