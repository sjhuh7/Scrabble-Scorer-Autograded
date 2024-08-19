// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("let's play some scrabble! Enter a word: ")
   return word;
};

function simpleScorer(word) {
   word = word.toUpperCase();
   return word.length
};

const vowels = ["A", "E", "I", "O", "U"]
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i]
      if (letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U") {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;

}



let newPointStructure = transform(oldPointStructure);

//let simpleScorer;

//let vowelBonusScorer;



const scoringAlgorithms = [
   {
      name: "Simple Score", 
      description: "Each letter is worth one point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log ("Choose which scoring system you would like to use? ");
   for (var i =0; i < scoringAlgorithms.length; i++) {
      console.log(i + ": " + scoringAlgorithms[i].name + " - " + scoringAlgorithms[i].description);
   }

   var userChoice = input.question("Enter number");

   if (userChoice === "0" || userChoice === "1" || userChoice === "2") {
      let index = Number(userChoice);
      return scoringAlgorithms[index]
   } else {
      console.log("Invalid choice. Please select number 0, 1, or 2");
      return scorerPrompt();
   }


}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];

      for (let i = 0; i < letters.length; i++) {
         let letter = letters[i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }
   return newPointStructure;

};

function runProgram() {
   let word = initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   let score = selectedAlgorithm.scorerFunction(word);
   console.log("score for '" + word + "' using" + selectedAlgorithm.name + ": " + score);
}

function scrabbleScorer (word) {
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      score += newPointStructure[letter];
   }
   return score;
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
