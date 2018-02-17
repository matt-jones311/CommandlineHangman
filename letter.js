Var Letter = function(ltr) {
	
	// stores actual letter
	
	this.letter = ltr;
	
	//property/boolean if the letter can be shown

	this.appear = false;

	this.letterRender = function() {

		//renders a blank as it is
		
		if(this.letter === ""){
			
			//makes sure that when the function checks if the word is found doesn't read the blank as false

			this.appear = true;

			return "";

		}if(this.appear === false){//If it doesn't appear , it returns a "_"

			return this.letter;
		}
	};

};

//export to use in word.js

module.exprts = Letter;