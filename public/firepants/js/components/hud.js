function Hud(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
    };
    
    function setupComponents(){

        var levelText=  new createjs.Text();
        levelText.x = 50;
        levelText.y = 0;
        levelText.font = '30px bitrod';
        levelText.color = '#000';   
        levelText.textAlign = 'left';
        this.levelText = levelText;
        this.addChild(levelText); 

        var scoreText = new createjs.Text();
        scoreText.x = 50;
        scoreText.y = 30;
        scoreText.font = '30px bitrod';
        scoreText.color = '#000';   
        scoreText.textAlign = 'left';
        this.scoreText = scoreText;
        this.addChild(scoreText); 

        var waterMeterOutline = new createjs.Shape();
        waterMeterOutline.graphics.beginFill('#AAD').drawRect(50, 60, 400, 30);
        this.addChild(waterMeterOutline);

        var waterMeter = new createjs.Shape();
        this.waterMeter = waterMeter;
        this.addChild(waterMeter);
    };
};

(function(){
        
    var prototype = createjs.extend(Hud, createjs.Container);
      
    prototype.updateLevel = function(level){
        this.levelText.text = 'Level ' + level;
    };

    prototype.updateScore = function(score, target){

        this.scoreText.text = "Score: " + score + '/' + target;
    };

    prototype.updateWater = function(amount, max){

        var pct = amount / max;
        this.waterMeter.graphics.clear();
        this.waterMeter.graphics.beginFill('#008').
        drawRect(55, 65, 390 * pct, 20);
    };
    
    Hud = createjs.promote(Hud, 'Container');
})();