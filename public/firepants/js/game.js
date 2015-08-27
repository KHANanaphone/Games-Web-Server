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

    var hud = new Hud({x: 0, y: 700});
    stage.addChild(hud);   

    var cursor = new createjs.Shape();
    cursor.graphics.beginFill('#00d').drawCircle(0, 0, 5);
    stage.addChild(cursor);
    Game.cursor = cursor;

	stage.on('stagemousemove', function(e){
		
		if(e.stageY > 700)
			cursor.alpha = 0;
		else
			cursor.alpha = 1;

		cursor.x = e.stageX;
		cursor.y = e.stageY;	
	});

	stage.on('stagemousedown', function(e){

		if(Game.message){
			Game.setLevel(Game.nextLevel);
			Game.stage.removeChild(Game.message);
			Game.paused = false;
			Game.message = null;
		};

		Game.mousedown = true;
	});

	stage.on('stagemouseup', function(e){

		Game.mousedown = false;
	});

	Game.stage = stage;
	Game.playingArea = playingArea;
	Game.hud = hud;
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

	Game.setLevel(1);

	var stage = Game.stage;
	var playingArea = Game.playingArea;

	playingArea.removeAllChildren();
	makeFireman();

	function makeFireman(){

		Game.fireman = new Fireman({
			x: 600,
			y: 800
		});
		Game.stage.addChild(Game.fireman);
	};
};

Game.setLevel = function(val){

	var level = {
		val: val,
		scoreRequired: 250 + val * 150,
		waterLeft: 700 + val * 100,
		waterMax: 700 + val * 100
	};

	Game.ticks = 0;
	Game.score = 0;
	Game.level = level;
	Game.hud.updateLevel(val);
	Game.hud.updateWater(level.waterLeft, level.waterMax);

	Game.addScore(0);
};

Game.shoot = function(x, y){

	if(!Game.fireman)
		return;

	if(y > 700)
		return;

	Game.fireman.shoot(x, y);
	Game.reduceWater(1);
};

Game.reduceWater = function(amt){

	Game.level.waterLeft -= amt;

	if(Game.level.waterLeft <= 0){

		if(Game.score >= Game.level.scoreRequired)
			Game.levelPassed();
		else
			Game.levelFailed();

		Game.paused = true;
		return;
	};
	Game.hud.updateWater(Game.level.waterLeft, Game.level.waterMax);
};

Game.levelFailed = function(){

	var msg = new createjs.Container();
	msg.x = 600;
	msg.y = 400;

	var t1 = new createjs.Text();
	t1.x = 0;
	t1.y = 0;
	t1.text = 'Level Failed';
	t1.textAlign = 'center';
	t1.font = '50px Arial';
	t1.color = 'red';
	msg.addChild(t1);
	Game.nextLevel = 1;

	var t2 = new createjs.Text();
	t2.x = 0;
	t2.y = 60;
	t2.text = 'Click to retry';
	t2.textAlign = 'center';
	t2.font = '20px Arial';
	t2.color = 'black';
	msg.addChild(t2);

	Game.nextLevel = 1;
	Game.message = msg;
	Game.stage.addChild(msg);
	Game.playingArea.removeAllChildren();
};

Game.levelPassed = function(){


	var msg = new createjs.Container();
	msg.x = 600;
	msg.y = 400;

	var t1 = new createjs.Text();
	t1.x = 0;
	t1.y = 0;
	t1.text = 'Level Passed';
	t1.textAlign = 'center';
	t1.font = '50px Arial';
	t1.color = 'green';
	msg.addChild(t1);
	Game.nextLevel = 1;

	var t2 = new createjs.Text();
	t2.x = 0;
	t2.y = 60;
	t2.text = 'Click to continue';
	t2.textAlign = 'center';
	t2.font = '20px Arial';
	t2.color = 'black';
	msg.addChild(t2);
	
	Game.nextLevel = Game.level.val + 1;
	Game.message = msg;
	Game.stage.addChild(msg);
	Game.playingArea.removeAllChildren();
};

Game.tick = function(){

	if(Game.paused)
		return;

	Game.ticks++;
	if(Game.ticks % 130 == 0)
		makePants();
	if(Game.ticks % 60 == 0)
		Game.reduceWater(5);

	CollisionManager.detectCollisions(Game.playingArea);

    if(Game.mousedown)
    	Game.shoot(Game.cursor.x, Game.cursor.y);

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
	Game.hud.updateScore(Game.score, Game.level.scoreRequired);
};