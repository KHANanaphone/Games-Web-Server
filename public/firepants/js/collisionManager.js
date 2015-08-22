var CollisionManager = {};

//detects collisions within the current room
CollisionManager.detectCollisions = function(area){
    
    var children = area.children;
    
    for(var i = 0; i < children.length; i++){
    
        var obj1 = children[i];
        
        if(!obj1.hitbox)
            continue;
        
        for(var j = i + 1; j < children.length; j++){
            
            var obj2 = children[j];
            
            if(!obj2.hitbox)
                continue;

            var obj1cares = collidesWith(obj1, obj2);
            var obj2cares = collidesWith(obj2, obj1);
            
            if(!obj1.parent || !obj2.parent)
                continue; //object has been removed from existence
            if(!obj1cares && !obj2cares)
                continue; //don't care about each other
            
            if(hasCollision(obj1, obj2)){
                
                if(obj1cares)
                    obj1.handleCollision(obj2);
                
                if(obj2cares)
                    obj2.handleCollision(obj1);
            }
        }        
    };
    
    function collidesWith(obj1, obj2){
        
        if(obj1.hitbox.collidesWith &&
            obj1.hitbox.collidesWith.indexOf(obj2.hitbox.type) != -1)
            return true;        
        
        return false;
    };
    
    function hasCollision(obj1, obj2){
        
        if(isNaN(obj1.x) || isNaN(obj1.y) || isNaN(obj2.x) || isNaN(obj2.y)){
            
            console.error("Object's location is invalid.");
            return false;
        }
        
        if(obj1.hitbox.radius && obj2.hitbox.radius)
            return hasCollisionCircleCircle(obj1, obj2);
        else if(obj1.hitbox.radius && !obj2.hitbox.radius)
            return hasCollisionCircleRect(obj1, obj2);
        else if(obj2.hitbox.radius && !obj1.hitbox.radius)
            return hasCollisionCircleRect(obj2, obj1);
        else
            return hasCollisionRectRect(obj1, obj2);
        
        function hasCollisionCircleCircle(obj1, obj2){
            
            var xDist = CollisionManager.getXDist(obj1, obj2);
            var yDist = CollisionManager.getYDist(obj1, obj2);            
            var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);
            
            if(totalDist > obj1.hitbox.radius + obj2.hitbox.radius)
                return false;
            
            return true;
        };
        
        function hasCollisionCircleRect(obj1, obj2){
            
            //find closest point on the rectangle to the circle
            var xPoint, yPoint;
            
            if(obj1.x < obj2.x - obj2.hitbox.width / 2)
                xPoint = obj2.x - obj2.hitbox.width / 2;
            else if(obj1.x > obj2.x + obj2.hitbox.width / 2)
                xPoint = obj2.x + obj2.hitbox.width / 2;
            else
                xPoint = obj1.x;     
            
            if(obj1.y < obj2.y - obj2.hitbox.height / 2)
                yPoint = obj2.y - obj2.hitbox.height / 2;
            else if(obj1.y > obj2.y + obj2.hitbox.height / 2)
                yPoint = obj2.y + obj2.hitbox.height / 2;
            else
                yPoint = obj1.y;
            
            //measure distance between that point and the middle of the circle
            var xDist = Math.abs(obj1.x - xPoint);
            var yDist = Math.abs(obj1.y - yPoint);            
            var totalDist = Math.sqrt(xDist * xDist + yDist * yDist);
            
            //is distance more or less than the circle's radius
            if(totalDist > obj1.hitbox.radius)
                return false;
            
            return true;            
        };
        
        function hasCollisionRectRect(obj1, obj2){
            
            var xDist = Math.abs(CollisionManager.getXDist(obj1, obj2)) - 
                (obj1.hitbox.width + obj2.hitbox.width) / 2; 
            var yDist = Math.abs(CollisionManager.getYDist(obj1, obj2)) - 
                (obj1.hitbox.height + obj2.hitbox.height) / 2; 
            
            if(isNaN(xDist) || xDist >= 0)
                return false;
            if(isNaN(yDist) || yDist >= 0)
                return false;
        
            return true;
        };
    }
};

//distance between centers of hitboxes of two objects
CollisionManager.getXDist = function(obj1, obj2){
    
    var x1center = obj1.hitbox.x + obj1.x;
    var x2center = obj2.hitbox.x + obj2.x;
    return x1center - x2center;    
};

CollisionManager.getYDist = function(obj1, obj2){
    
    var y1center = obj1.hitbox.y + obj1.y;
    var y2center = obj2.hitbox.y + obj2.y;
    return y1center - y2center;
};