var Game = {
	stage: null
};

Game.load = function(){
       
	var stage = new createjs.Stage('gameCanvas');
    createjs.Ticker.setFPS(60);		
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', function(){

    	Game.tick();
    	stage.update();
    });

	var playingArea = makePlayingArea();
	stage.addChild(playingArea);

    var cursor = new createjs.Shape();
    cursor.graphics.beginFill('#00d').drawCircle(0, 0, 5);
    stage.addChild(cursor);

    var scoreText = new createjs.Text();
    scoreText.x = 50;
    scoreText.y = 820;
    scoreText.font = '30px bitrod';
    scoreText.color = '#000';   
    scoreText.textAlign = 'left';
    Game.scoreText = scoreText;
    stage.addChild(scoreText);    

	stage.on('stagemousemove', function(e){
		
		if(e.stageY > 700)
			cursor.alpha = 0;
		else
			cursor.alpha = 1;

		cursor.x = e.stageX;
		cursor.y = e.stageY;	
	});

	stage.on('stagemousedown', function(e){

		Game.shoot(e.stageX, e.stageY);
	});

	Game.stage = stage;
	Game.playingArea = playingArea;
    Game.start();

    function makePlayingArea(){

		var playingArea = new createjs.Container();
		playingArea.x = 0;
		playingArea.y = 0;
		playingArea.on('tick', function(){

			var children = this.children;

			for(var i = 0; i < children.length; i++){
				if(children[i].tick)
					children[i].tick();
			}
		});

		return playingArea;
	}
};

Game.start = function(){

	Game.ticks = 0;
	Game.score = 0;
	Game.updateScore();

	var stage = Game.stage;
	var playingArea = Game.playingArea;

	playingArea.removeAllChildren();
	makeFireman();

	function makeFireman(){

		var fireman = SpriteManager.makeSprite('fireman');
		fireman.x = 600;
		fireman.y = 800;
		Game.playingArea.addChild(fireman);

		Game.shootingPoint = {x: 632, y: 762};
	};
};

Game.shoot = function(x, y){

	if(!Game.shootingPoint)
		return;

	if(y > 700)
		return;

	var trajX = x- Game.shootingPoint.x;
	var trajY = y - Game.shootingPoint.y;
	var norm = Math.sqrt(trajX * trajX + trajY * trajY);

	var water = new Water({
		x: Game.shootingPoint.x,
		y: Game.shootingPoint.y,
		vector: {x: trajX / norm, y: trajY / norm}
	});

	Game.playingArea.addChild(water);
};

Game.tick = function(){

	Game.ticks++;
	if(Game.ticks % 80 == 0)
		makePants();

	CollisionManager.detectCollisions(Game.playingArea);

	function makePants(){

		var row = Math.floor(Math.random() * 4);
		var left = row % 2 == 0;
		var y = row * 150  + 100;

		var pants = new Pants({
			x: left ? 0 : 1200,
			y: y,
			movement: left ? 'right' : 'left',
			on_fire: Math.random() > 0.25 ? true : false
		});
		Game.playingArea.addChild(pants);
	};
};

Game.addScore = function(amt){	
	Game.score += amt;
	Game.updateScore();
};

Game.updateScore = function(){

	Game.scoreText.text = "Score: " + Game.score;
}