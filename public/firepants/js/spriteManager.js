var SpriteManager = {
    spriteData: {}
};

SpriteManager.makeSprite = function(id, dontCenter){
    
    var spriteData = SpriteManager.spriteData[id];
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    var sprite = new createjs.Sprite(spriteSheet); 
    
    if(!dontCenter)
    sprite.set({
        regX: spriteData.frames.width / 2,
        regY: spriteData.frames.height / 2
    });  

    return sprite;
};

SpriteManager.spriteData = {
        
    'fireman' : {
        images: ['img/fireman.png'],
        frames : {width: 75, height: 187},
        animations: {
            initial: 0
        }
    },

    'pants' : {
        images: ['img/pants.png'],
        frames : {width: 100, height: 146},
        animations: {
            initial: 0,
            on_fire: 1
        }
    }
};