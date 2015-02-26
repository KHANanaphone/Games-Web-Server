var PotionLogic = {};

PotionLogic.ApplyPotion = function() {

    if (PuzzleScene.puzzle.movesLeft == PuzzleScene.puzzle.maxMoves)
        return;

    PuzzleScene.puzzle.movesLeft++;
    PuzzleScene.UpdateMovesLeft();
};

PotionLogic.ApplyPoison = function() {

    if (PuzzleScene.puzzle.movesLeft == 0)
        return;

    PuzzleScene.puzzle.movesLeft--;
    PuzzleScene.UpdateMovesLeft();
}