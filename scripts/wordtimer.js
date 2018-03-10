
var boxCircle = document.querySelector(".click-me");
var yourTime = document.getElementById("seconds");
var sumTime = document.getElementById("total-seconds");
// var shapeAppear = new Stopwatch();
var shapeHide = new Stopwatch();
var totalTime = 0

var wordList = [];

var addScore = document.getElementById("add-score");
var highScoreList = []
var winnerData = new Object();

//you can just do var start = new Date().getTime(); / var end = new Date().getTime(); to take current times 
//as code runs
sumTime.textContent = totalTime + " seconds";

$("input[type='text']").keypress(function(event){
  if(event.which === 13){
    //grab text from input
    var newWord = $(this).val();
    //clear input
    $(this).val("");
    //push to array
    wordList.push(newWord);
  }
});

boxCircle.addEventListener("click", function(){
  hideTheShape();
});

$("#start").on("click", function(){
  heresTheShape();
});

$("#new-game").on("click", function(){
  wordList = [];
  yourTime.textContent = "";
  totalTime = 0;
  sumTime.textContent = totalTime;
  boxCircle.classList.add("hide-me");

});

//wrap this in a function - have all three functions kick in after random time, toggle off display=none
function heresTheShape(){
	// shapeAppear.start(); //Start the stopwatch
	// As a test, I use the setTimeout function to delay st.stop();

	setTimeout(function (){
	    // shapeAppear.stop(); // Stop it t seconds later...
	    boxCircle.classList.toggle("hide-me");
	    boxCircle.style.borderRadius = randomShape() + "%";
	    boxCircle.style.backgroundColor = randomColor();
	    boxCircle.style.transform = randomPosition();
	    shapeHide.start();
	    }, Math.floor(Math.random()*3000)); // time is now logging to "Your time" after "random" seconds, this
	//looks independent from the stopwatch so maybe I can eliminate that in the broader function? YES!
  var n = Math.floor(Math.random()*wordList.length);
  $("#word-container").text(wordList[n]);
  wordList.splice(n, 1);

  // if(wordList==="[]"){
  //   alert("No more words. Your total time is " + totalTime) minor bug, fix later
  // }

};

function hideTheShape(){

	shapeHide.stop(); // Stop it t seconds later...
	boxCircle.classList.toggle("hide-me");
	yourTime.textContent = (shapeHide.getSeconds()) + " seconds";
  totalTime += shapeHide.getSeconds();
  sumTime.textContent = totalTime + " seconds";
	shapeHide.clear();

	heresTheShape();
};

//generate a random shape
function randomShape(){
	return Math.floor(Math.random()*50);
}

//generate a random position

function randomPosition(){
	var x = Math.floor(Math.random()*400);
	var y = Math.floor(Math.random()*85);
	return "translate(" + x + "%, " + y + "%)"
}

//generate a random color
function randomColor(){
	var r = Math.floor(Math.random()*151);

	var g = Math.floor(Math.random()*151);

	var b = Math.floor(Math.random()*151);

	return "rgb(" + r + ", " + g + ", " + b + ")"
}

addScore.addEventListener("click", function(){
  var newName = prompt("Great Work! What is your name?");
  $("ol").append("<li><span class='winner-name'>" + newName + "</span>: <span class='high-score'>" + totalTime +"</span></li>");
  insertNewScore();
});

function insertNewScore() {
  for(i = 0; i < document.querySelectorAll(".winner-name").length; i++){
    winnerData = {
      player: document.querySelectorAll(".winner-name")[i].textContent,
      score: document.querySelectorAll(".high-score")[i].textContent
    }
    highScoreList.push(winnerData);
  }

  highScoreList.sort(orderScores);
  $("ol").html("");
  var orderedName;
  var orderedScore;

  for(i = 0; i < highScoreList.length; i++){
    orderedName = highScoreList[i].player;
    orderedScore = highScoreList[i].score;
    $("ol").append("<li><span class='winner-name'>" + orderedName + "</span>: <span class='high-score'>" + orderedScore +"</span></li>");
  };
  highScoreList = [];
};

function orderScores(a,b) {
  return parseInt(a.score, 10) - parseInt(b.score, 10);
}

// Implementation of stopwatch function - google "date()" and "new":

function Stopwatch(){
  var startTime, endTime, instance = this;

  this.start = function (){
    startTime = new Date();
  };

  this.stop = function (){
    endTime = new Date();
  }

  this.clear = function (){
    startTime = null;
    endTime = null;
  }

  this.getSeconds = function(){
    if (!endTime){
    return 0;
    }
    return (endTime.getTime() - startTime.getTime()) / 1000;
  }

  this.getMinutes = function(){
    return instance.getSeconds() / 60;
  }      
  this.getHours = function(){
    return instance.getSeconds() / 60 / 60;
  }    
  this.getDays = function(){
    return instance.getHours() / 24;
  }   
}

//write time to variable and record to empty span id "seconds"
// yourTime.textContent = (name of new stopwatch function variable.getSeconds()) + " seconds";



