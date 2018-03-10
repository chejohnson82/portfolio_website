var newGame = document.getElementById("new");
var shuffleCards = document.getElementById("reshuffle");
var wordCards = document.querySelectorAll(".word-card");
var wordOnCard = document.querySelectorAll(".vocab");
var gameMessage = document.getElementById("messages");
var scoreBoard = document.getElementById("score");
var cardHide = document.getElementById("hide");

var addScore = document.getElementById("add-score");
var highScoreList = []
var winnerData = new Object();

var numWords;
var words = [];
var gameScore = 0;

scoreBoard.textContent = gameScore + " points";
cardFlip();

//click the new game button
newGame.addEventListener("click", function(){
	words = [];
	numWords = Number(prompt("How many new words do you have? (No more than 8 words)"));
	gameScore = numWords
	scoreBoard.textContent = gameScore + " points";
	gameMessage.textContent = "";
	enterWords(numWords);
	shuffle(words);
	cardPrint();
	hideCards();
});

shuffleCards.addEventListener("click", function(){
	shuffle(words);
	cardPrint();
	hideCards();
	gameScore = (words.length / 2);
	gameMessage.textContent = "";
	scoreBoard.textContent = gameScore + " points";
});

cardHide.addEventListener("click", function(){
	hideCards();
});

// document.getElementById("add-score").addEventListener("click", function(){
// 	addPlayerScore();
// });

// function addPlayerScore(){
// 	var playerName = prompt("What is your name?");
// 	highScoreList.innerHTML = highScoreList + "<li>hey hey</li>";
// }
// http://www.javascriptkit.com/javatutors/dom2.shtml start from here, need to add an element node to the DOM 
// or can be done during active session with jQuery, but need to manually update scores to 
// the HTML file until I learn back-end


addScore.addEventListener("click", function(){
	var newName = prompt("Great Work! What is your name?");
	$("ol").append("<li><span class='winner-name'>" + newName + "</span>: <span class='high-score'>" + gameScore +"</span></li>");
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
  return parseInt(b.score, 10) - parseInt(a.score, 10);
}

function hideCards(){
	for(var i = 0; i < wordOnCard.length; i++){
		if(wordCards[i].style.backgroundColor === "black"){
			wordOnCard[i].style.color = "black";
		} else {
			wordOnCard[i].style.color = "yellow";
		}
	}
};


function enterWords(numWords){
	for(i = 0; i < numWords; i++) {
		var enteredWord = (prompt("How do you spell _____? Type your answer here"));
		words.push(enteredWord);
		words.push(enteredWord);
	}
};

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

function cardPrint() {
	for(var i = 0; i < wordCards.length; i++){
		if(words[i]){
			wordCards[i].style.display = "block";
			wordCards[i].style.backgroundColor = "yellow";
			wordOnCard[i].textContent = words[i];
		} else {
			wordCards[i].style.display = "none";
		}
	};
};

function cardFlip() {

	var clickedCard = null;
	var arr = [];

	for(var i = 0; i < wordOnCard.length; i++){
		//add click listeners to word cards
		wordOnCard[i].addEventListener("click", function(){
			//first click --> grab word of clicked card (this=card[i])
			if(clickedCard === null) {
				clickedCard = this.innerHTML
				this.style.color = "black";
			} else if(clickedCard !== this.innerHTML) {
				gameMessage.textContent = "Sorry, please try again.";
				clickedCard = null
				this.style.color = "black";
				gameScore-=1;
				scoreBoard.textContent = gameScore + " points";
			} else {
				arr.push(words.indexOf(clickedCard));
				arr.push(words.lastIndexOf(clickedCard));
				for(var c = 0; c < arr.length; c++){
					var cardNumber = arr[c];
					wordCards[cardNumber].style.backgroundColor = "black";
				}

				gameMessage.textContent = "It's a Match! Great Job!";
				gameScore+=5;
				scoreBoard.textContent = gameScore + " points";
				this.style.color = "black";
				arr = [];
				clickedCard = null;
			}
		});
	}
}
