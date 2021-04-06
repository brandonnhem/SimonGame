var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var randomChosenColor;

var level = 0;

var gameInProgress = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function onClick(buttonId) {
    var userChosenColor = buttonId;
    userClickedPattern.push(userChosenColor);
    playSound(buttonId);
    animatePress(buttonId);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
        console.log("success");
    } else {
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press 'A' Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameInProgress = false;
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function (event) {
    if (gameInProgress) {
        onClick(event.target.id);
        checkAnswer(userClickedPattern.length - 1);
        console.log("userclickedPattern: " + userClickedPattern);
    } else {
        console.log("Game not in progress");
    }
});

$(document).keypress(function (event) {
    if (event.originalEvent.key == 'a' && gameInProgress == false) {
        gameInProgress = true;
        nextSequence();
        console.log("Game started");
        $("h1").text("Level " + level);
    } else if (event.originalEvent.key != 'a') {
        console.log("Incorrect input");
    } else {
        console.log("Game already in progress");
    }
});