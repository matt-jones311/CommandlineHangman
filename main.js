// Define imports
var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./word.js');
var hangman = require('./hangman');

// hangman graphic
var hangManDisplay = hangman.hangman;
// set the maxListener
//require("events").EventEmitter.prototype._maxListeners = 100;
var stars = '\n************************';

var Hangman = {
    wordBank: hangman.wordList,
    guessesRemaining: 10,

    // empty array to hold the letters guessed by user, and checks if the user guessed the letter already
    guessedLetters: [],

    // index to display graphic
    display: 0,
    currentWord: null,

    startGame: function(answer) {
        // clears guessedLetters before a new game starts if it's not already empty
        this.guessedLetters = [];
        if (answer.play) {
            this.newGame();
        } else {
            console.log('Oh Well, I will catch you next time...');
        }
    },

    // asks the user if they are ready to play
    startGamePrompt: function() {
        inquirer
            .prompt([
                {
                    name: 'play',
                    type: 'confirm',
                    message: 'Ready to play?'
                }
            ])
            .then(this.startGame.bind(this));
    },

    // starts new game
    newGame: function() {
        this.guessesRemaining = 10;
        console.log('Okay! Lets get started!');
        console.log(stars);

        // generates random number based on the wordBank
        var randNum = Math.floor(Math.random() * this.wordBank.length);
        this.currentWord = new Word(this.wordBank[randNum]);
        this.currentWord.getLetters();

        // display current word as blanks
        console.log(this.currentWord.wordRender());
        this.gamePrompt();
    },

    gamePrompt: function() {
        inquirer
            .prompt([
                {
                    name: 'chosenLetter',
                    type: 'input',
                    message: 'Choose a letter:',
                    validate: function (value) {
                        if (/[0-9\s]/.test(value)) return true;
                        else return isLetter(value);
                    }
                }
            ])
            .then(this.handleGuess.bind(this));
    },

    handleGuess: function(letter) {
        // asks player for a letter
        // toUpperCase becuase words in the bank are all caps
        var letterReturned = letter.chosenLetter.toUpperCase();

        // adds to the guessedLetters array if it isn't already there
        var guessedAlready = false;
        for (var guessedLetter of this.guessedLetters) {
            if (letterReturned === guessedLetter) {
                guessedAlready = true;
            }
        }

        //if the letter wasn't already run through entire function, else reprompt user
        if (!guessedAlready) {
            this.guessedLetters.push(letterReturned);
            var found = this.currentWord.checkIfLetterFound(letterReturned);

            // if none were found tells user they were wrong
            if (found === 0) {
                console.log('Wrong!');
                this.guessesRemaining--;
                // this.display++;
                console.log('Guesses remaining: ' + this.guessesRemaining);
                // console.log(hangManDisplay[this.display - 1]);

                console.log(stars);
                console.log(this.currentWord.wordRender());
                console.log(stars);

                console.log('Letters guessed: ' + this.guessedLetters);
            } else {
                console.log('Yes! Correct!');

                //check to see if the user won
                if (this.currentWord.didWeFindTheWord()) {
                    console.log(this.currentWord.wordRender());
                    console.log(stars);
                    console.log('You Won The Game!!!');
                    return this.startGamePrompt();
                } else {
                    // display the user how many guesses remaining
                    console.log('Guesses remaining: ' + this.guessesRemaining);
                    console.log(this.currentWord.wordRender());
                    console.log(stars);
                    console.log('Letters guessed: ' + this.guessedLetters);
                }
            }

            this.gamePrompt();
            // if (this.guessesRemaining > 0 && this.currentWord.wordFound.word) {
            //     this.keepPromptingUser();
            // }
        } else if (!this.guessesRemaining) {
            console.log('Game Over!');
            console.log('The answer was: ' + this.currentWord);
            this.startGamePrompt();
        } else {
            console.log('You have already guessed this letter, Try Again!');
            this.gamePrompt();
        }
    }
};

Hangman.startGamePrompt();
