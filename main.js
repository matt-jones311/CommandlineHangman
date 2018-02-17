//require inquire

var inquirer = require("inquirer");

var isLetter = require("is-letter");

//require objects/exports

var Word = require("./word.js");
var Game = require("./hangman.js");

//hangman graphic

var hangManDisplay = Game.newWord.hangman;

//set the maxListener

require("events").EventEmitter.prototype._maxListers = 100;

var hangman = {

	wordBank: Game.newWord.wordList,
	guessesRemaining: 10,

	//empty array to hold the letters guessed by user, and checks if the user guessed the letter already 
	guessedLetters: [],

	//index to display graphic
	display: 0,
	currentWord: null,

	//asks the user if they are ready to play
	startGame: function() {
		var that = this;

		//clears guessedLetters before a new game starts if it's not already empty
		if(this.guessedLetters.length > 0){
			this.guessedLetters = [];

		}

		inquirer.prompt([{
			name: "play",
			type: "confirm",
			message: "Ready to play?"

		}]).then(function(answer){
			if(anser.play){
				that.newGame();

			}else{
				console.log("Oh Well, I will catch you next time...");

			}
		})
	},

	// starts new game

	newGame: function() {
		if(this.guessesRemaining === 10) {
			console.log("Okay! Lets get started!");
			console.log("*************");

			//generates random numer based on the wordBank

			var randNum = math.floor(Math.random()*this.wordBank.length);
			this.currentWord = new Word(this.currentWord.wordRender());
			this.currentWord.getLets();

			//display current word as blanks

			console.log(this.currentWord.wordRender());
			this.keepPromptingUser();

		} else {
			this.resetGuessesRemaining();
			this.newGAme();

		}
	},

	resetGuessesRemaining: function() {
		this.guessesRemaining = 10;

	},

	keepPromptingUser : function(){
		var that = this;

		//asks player for a letter

		inquirer.prompt([{
			name: "chosenLtr",
			type: "input",
			message: "Choose a letter:",
		validate: function(value){
			if(isLetter(value)){
				return true;

			}else{
				return false;
			}
		}
		}]).then(function(ltr){

			//toUpperCase becuase words in the bank are all caps

			var letterReturned = (ltr.chosenLtr).toUpperCase();

			//adds to the guessedLetters array if it isn't already there

			var guessedAlready = false;
				for(var i = 0; i < that.guessedLetters.length; i++){
					if(letterReturned === that.guessedLetters[i]){
						guessedAlready = true;
					}
				}

				//if the letter wasn't already run through entire function, else reprompt user

				if(guessedAlready === false){
					that.guessedLetters.push(letterReturned);

					var found = that.currentWord.checkIfLetterFound(letterReturned);

					//if none were found tells user they were wrong

					if(found === 0){
						console.log("Wrong!");
						that.guessesRemaining--;
						that.display++;
						console.log("Guesses remaining: " + that.guessesRemaining);
						console.log(hangManDisplay[(that.display)-1]);


						console.log("\n*******************");
						console.log(that.currentWord.wordRender());
						console.log("\n*******************");

						console.log("Letters guessed: " + that.guessedLetters);

					}else{

						console.log("Yes! Correct!");

						//check to see if the user won

						if(that.currentWord.didWeFindTheWord() === true){
							console.log(that.currentWord.wordRender());
							console.log("\n*******************");
							console.log("You Won The Game!!!");

							//that.startGame();
						}else{

							//display the user how many guesses remaining
							console.log('Guesses remaining: ' + that.guessesRemaining);
                			console.log(that.currentWord.wordRender());
                			console.log('\n*******************');
                			console.log("Letters guessed: " + that.guessedLetters);
						}

					}
					if(that.guessesRemaining > 0 && that.currentWord.wordFound.word);
					that.keepPromptingUser();
				}else if(that.guessesRemaining === 0){
					console.log("Game Over!");
					console.log("The answer was: " + that.currentWord);

				}else{
					console.log("You have already guessed that letter, Try Again!")
					that.keepPromptingUser();
				}
		});
	}
}


hangman.startGame();






