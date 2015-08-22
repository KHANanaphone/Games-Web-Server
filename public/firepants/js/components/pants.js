function Pants(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.source = vars.source;
        
        this.x = vars.x;
        this.y = vars.y;
        this.movement = vars.movement;
        this.on_fire = vars.on_fire;
        this.speed = 3;
        
        this.hitbox = {
            type: 'target',
            collidesWith: ['water'],
            x: 0,
            y: 40,
            width: 100,
            height: 80
        };
    };
    
    function setupComponents(){

        var frame = this.on_fire ? 'on_fire' : 'initial';
        this.pants = SpriteManager.makeSprite('pants'); 
        this.pants.gotoAndStop(frame);
        this.addChild(this.pants);

        var text = new createjs.Text();
        text.alpha = 0;
        text.x = 0;
        text.font = '30px bitrod';
        text.textAlign = 'center';
        this.text = text;
        this.addChild(text);
    };
};

(function(){
        
    var prototype = createjs.extend(Pants, createjs.Container);
      
    prototype.tick = function(){
        
        if(this.movement == 'left')
            this.x -= this.speed;
        else if(this.movement == 'right')
            this.x += this.speed; 

        if(this.x < 0 || this.y < 0 || this.x > 1200 || this.y > 900)
        	this.destroy();     

        if(this.text.alpha > 0)
            this.text.alpha -= 0.015;
    };
    
    prototype.handleCollision = function(obj){
      
        if(this.on_fire){
            Game.addScore(5);
            this.on_fire = false;
            this.pants.gotoAndStop('initial');

            this.text.text = '+5';
            this.text.color = '#0F0';
            this.text.y = -50;
            this.text.alpha = 0.8;
        }
        else{
            Game.addScore(-5);

            this.text.text = '-5';
            this.text.color = '#F00';
            this.text.y = -50;
            this.text.alpha = 0.8;
        }
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Pants = createjs.promote(Pants, 'Container');
})();