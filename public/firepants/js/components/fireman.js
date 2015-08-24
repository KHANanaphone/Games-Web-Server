function Fireman(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;

        SpriteManager.makeSprite('fireman');
        Game.shootingPoint = {x: 632, y: 762};
    };
    
    function setupComponents(){

        this.sprite = SpriteManager.makeSprite('fireman'); 
        this.sprite.gotoAndStop('upmid');
        this.addChild(this.sprite);

        this.shootingPoint = {x: 40, y: -20};

        var pt = new createjs.Shape();
        pt.graphics.beginFill('red').drawRect(
            this.shootingPoint.x, this.shootingPoint.y, 2, 2);
        this.addChild(pt);
    };
};

(function(){
        
    var prototype = createjs.extend(Fireman, createjs.Container);  

    prototype.shoot = function(x, y){
    
        var startX = this.x + this.shootingPoint.x;
        var startY = this.y + this.shootingPoint.y;
        var trajX = x - startX;
        var trajY = y - startY;
        var norm = Math.sqrt(trajX * trajX + trajY * trajY);

        var water = new Water({
            x: startX,
            y: startY,
            vector: {x: trajX / norm, y: trajY / norm}
        });

        Game.playingArea.addChild(water);

        var row = y < 300 ? 'top' : 'bot';
        var col = x < 225 ? 'left' : 
                  x < 450 ? 'midleft' :
                  x < 750 ? 'mid' :
                  x < 975 ? 'midright' : 'right';

        this.sprite.gotoAndStop(row + col);
    };

    Fireman = createjs.promote(Fireman, 'Container');
})();