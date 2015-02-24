var PotionLogic = {};

PotionLogic.ApplyPotion = function(){
  
    PuzzleScene.puzzle.movesLeft = PuzzleScene.puzzle.maxMoves;
    PuzzleScene.UpdateMovesLeft();
};

PotionLogic.ApplyPoison = function(){
    
    PuzzleScene.puzzle.movesLeft = 0;
    PuzzleScene.UpdateMovesLeft();
}
