function Pants(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.movement = vars.movement;
        this.maxHealth = 80;
        this.health = vars.on_fire ? this.maxHealth : -1;
        this.speed = 1.3;
        this.currentTextVal = 0;    
        
        this.hitbox = {
            type: 'target',
            collidesWith: ['water'],
            x: 0,
            y: 40,
            width: 100,
            height: 80
        };

        this.immunity = 0;
    };
    
    function setupComponents(){

        this.pants = SpriteManager.makeSprite('pants'); 
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
            this.text.alpha -= 0.02;
        else
            this.currentTextVal = 0;

        var frame;
        if(this.health > this.maxHealth * 0.75)
            frame = 'fire100';
        else if(this.health > this.maxHealth * 0.50)
            frame = 'fire75';
        else if(this.health > this.maxHealth * 0.25)
            frame = 'fire50';
        else if (this.health > 0)
            frame = 'fire25';
        else
            frame = 'out';

        this.pants.gotoAndStop(frame);

        if(this.immunity > 0)
            this.immunity--;
    };
    
    prototype.handleCollision = function(obj){
      
        if(this.immunity > 0)
            return;

        if(this.health > 0){

            this.health -= 1;
            if(this.health == 0){

                Game.addScore(100);

                this.immunity = 60;
                this.text.text = '+100';
                this.text.color = '#0F0';
                this.text.y = -50;
                this.text.alpha = 0.8;
            }
        }
        else if(this.health <= 0){

            Game.addScore(-1);
            this.currentTextVal -= 1;
            this.text.text = this.currentTextVal;
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