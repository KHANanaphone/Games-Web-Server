var Timer = {
    actions: [],
    running: false,
    interval: 200
};

Timer.Run = function() {

    Timer.running = true;
    Timer.Step();
};

Timer.Step = function() {

    var actions = Timer.actions.slice();
    var finished = true;

    for (var i = 0; i < actions.length; i++) {

        var action = actions[i];

        if (action.finished == true)
            continue;

        finished = false;
        action.step();
    }

    if (!finished)
        setTimeout(Timer.Step, Timer.interval);
    else {
        Timer.Stop();
        PuzzleScene.SolutionCheck();
    }
};

Timer.AddAction = function(action) {

    Timer.actions.push(action);
};

Timer.Stop = function() {

    Timer.running = false;
    Timer.actions = [];
}