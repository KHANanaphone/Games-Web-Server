//water
function Water(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.source = vars.source;
        
        this.x = vars.x;
        this.y = vars.y;
        this.vector = vars.vector;
        this.speed = 18;
        this.timeleft = -1;
        this.fadetime = 20;
        
        this.hitbox = {
            type: 'water',
            collidesWith: ['target'],
            x: 0,
            y: 0,
            width: 15,
            height: 15
        };
    };
    
    function setupComponents(){

        var rand = Math.floor(Math.random() * 3);
        var color = rand == 0 ? '#88F' : (rand == 1 ? '#DDF' : '#AAF');

        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawCircle(0, 0, 10);
        this.addChild(shape);
    };
};

(function(){
        
    var prototype = createjs.extend(Water, createjs.Container);
      
    prototype.tick = function(){
        
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;   

        if(this.x < 0 || this.y < 0 || this.x > 1200 || this.y > 900)
        	this.destroy();   

        if(this.timeleft > 0){
            this.timeleft--;
            this.alpha -= 1 / this.fadetime;

            if(this.timeleft == 0)
                this.destroy();
        }  
    };
    
    prototype.handleCollision = function(obj){

        this.hitbox = null;
        this.timeleft = this.fadetime;
        var angle = Math.random() * Math.PI * 2;

        this.vector = {
            x: Math.cos(angle) * 0.2,
            y: Math.sin(angle) * 0.2
        };
    };
    
    prototype.destroy = function(){
        
        this.parent.removeChild(this);
    };
    
    Water = createjs.promote(Water, 'Container');
})();