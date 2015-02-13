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