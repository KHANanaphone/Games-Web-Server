var BombLogic = {};

BombLogic.Detonate = function(tile) {
    
    var x = tile.$tile.attr('x');
    var y = tile.$tile.attr('y');
    
    if(tile.subtype == 'fire')
        detonateFire();
    else if(tile.subtype == 'ice')
        detonateIce();
    else if(tile.subtype == 'lightning')
        detonateLightning();
    
    function detonateFire(){
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'UL',
            type: 'fire',
            step: FireLogic.Step
        });
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'UR',
            type: 'fire',
            step: FireLogic.Step
        });
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'DL',
            type: 'fire',
            step: FireLogic.Step
        });
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'DR',
            type: 'fire',
            step: FireLogic.Step
        });
    };
    
    function detonateIce(){
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'L',
            type: 'ice',
            step: IceLogic.Step
        });
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'R',
            type: 'ice',
            step: IceLogic.Step
        });
    };
    
    function detonateLightning(){
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'U',
            type: 'lightning',
            step: LightningLogic.Step
        });
        
        Timer.AddAction({
            x: x,
            y: y,
            direction: 'D',
            type: 'lightning',
            step: LightningLogic.Step
        });
    };
};