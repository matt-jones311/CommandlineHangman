// require letter objects

var Letter = require('./letter.js');

function Word(word) {
    this.word = word; // collection of the letter objects
    this.letters = [];
    this.wordFound = false;

    this.getLetters = function() {
        // populate the collection above with the new Letter objects
        for (var letter of this.word) {
            var newLetter = new Letter(letter);
            this.letters.push(newLetter);
        }
    };

    // found the current word
    this.didWeFindTheWord = function() {
        var everLetterShouldAppear = this.letters.every(function(letter) {
            return letter.appear;
        });

        if (everLetterShouldAppear) {
            this.wordFound = true;
            return true;
        }
    };

    this.checkIfLetterFound = function(guessedLetter) {
        var whatToReturn = 0;

        // iterates through each letter to see if it matches the guessed letter
        for (var letter of this.letters) {
            if (letter.letter === guessedLetter) {
                letter.appear = true;
                whatToReturn++;
            }
        }

        // if guessLetter matches Letter property, the letter object should be shown
        return whatToReturn;
    };

    this.wordRender = function() {
        var display = '';

        // render the word based on if the letters are found or not
        for (var letter of this.letters) {
            var currentLetter = letter.letterRender();
            display += currentLetter;
        }

        return display;
    };
}

module.exports = Word;