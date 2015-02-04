//The 'logic' files are basically extensions of PuzzleScene
var LightningLogic = {};

LightningLogic.ShootLightning = function(lightning) {

    Timer.AddAction({
        x: lightning.x,
        y: lightning.y,
        direction: lightning.isTop ? 'D' : 'U',
        type: 'lightning',
        step: LightningLogic.Step
    });

    Timer.Run();

    PuzzleScene.ReduceMovesLeft();
};

LightningLogic.Step = function() {

    
    //move
    if (this.direction == 'U')
        this.y--;
    else
        this.y++;

    var $tile = PuzzleScene.$tiles[this.y][this.x];

    //check boundary, set 'finished' flag if needed
    if ($tile.attr('tile-type') != 'board') {

        this.finished = true;
        return;
    }

    //else do action to tile
    var tile = PuzzleScene.board[$tile.attr('board-y')][$tile.attr('board-x')];
    this.finished = tile.ApplyLightning();
}