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
        frames : {width: 180, height: 210},
        animations: {
            topleft: 0,
            topmidleft: 1,
            topmid: 2,
            topmidright: 3,
            topright: 4,
            botleft: 5,
            botmidleft: 6,
            botmid: 7,
            botmidright: 8,
            botright: 9
        }
    },

    'pants' : {
        images: ['img/pants.png'],
        frames : {width: 125, height: 175},
        animations: {
            fire100: 0,
            fire75: 1,
            fire50: 2,
            fire25: 3,
            out: 4
        }
    }
};