var Letter = function(ltr) {
  // stores actual letter
  this.letter = ltr;

  // property/boolean if the letter can be shown
  this.appear = false;

  this.letterRender = function() {
      if (this.letter === '') {
          this.appear = true
          return this.letter;
      }
      return this.appear ? this.letter : '_';
  };
};

// export Letter constructor
module.exports = Letter;
