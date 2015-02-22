$(document).ready(function(){
    
    adjustHeight();
    
	$(window).on('resize', function(){
		adjustHeight();
	});
    
    PuzzleScene.Init();
    MenuScene.Init();
    
    function adjustHeight(){
    	
		$('#main').css('width', $(window).height()/1.75 + 2);
    }

});

var DEBUG_CTRL = false;

$(document).keydown(function(event){
    if(event.which=="17")
        DEBUG_CTRL = true;
});

$(document).keyup(function(event){
    if(event.which=="17")
        DEBUG_CTRL = false;
});