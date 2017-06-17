// Declare variables
var i = 0;
var score = 0;

const questionText = document.getElementById('question');
const questionAnswers = document.getElementById('answers');
const questAnsWrapper = document.getElementById('question-answer-wrapper');
const answerOne = document.getElementById('answer-one');
const answerTwo = document.getElementById('answer-two');
const answerThree = document.getElementById('answer-three');
const answerFour = document.getElementById('answer-four');
const submit = document.getElementById('submit-answer');
const restart = document.getElementById('restart-quiz');

const backgroundQNum = document.getElementById('question-number-lg');
console.log(backgroundQNum.innerHTML);
const answerBox = document.getElementById('correct-answers-box');
const answerBoxTitle = document.getElementById('answers-title');
const answerList = document.getElementById('answer-list');


const questions = [];

function Question = function Question() {
	this.question;
	this.answers = [];
}
// Declare list of questions
// 

const questionOne = new Question();

questionOne.question = "Who is the patron saint of Spain?";
questionOne.answers.push("Saint James");
questionOne.answers.push("Saint John");
questionOne.answers.push("Saint Benedict");
questionOne.answers.push("Saint Peter");

const questionTwo = new Question();

questionTwo.question = "Which king was married to Eleanor of Aquitaine?";
questionTwo.answers.push("Henry I");
questionTwo.answers.push("Henry V");
questionTwo.answers.push("Henry II");
questionTwo.answers.push("Richard I");

const questionThree = new Question();

questionThree.question = "The Newlyn School of the late 19th century, is associated with which group of people?";
questionThree.answers.push("Method actors");
questionThree.answers.push("Circus entertainers");
questionThree.answers.push("Painters");
questionThree.answers.push("Musicians");

const questionFour = new Question();

questionFour.question = "If you planted the seeds of Quercus robur, what would grow?";
questionFour.answers.push("Trees");
questionFour.answers.push("Flowers");
questionFour.answers.push("Vegetables");
questionFour.answers.push("Grain");

const questionFive = new Question();

questionFive.question = "Which of these African countries is situated south of the equator?";
questionFive.answers.push("Ethiopia");
questionFive.answers.push("Nigeria");
questionFive.answers.push("Zambia");
questionFive.answers.push("Chad");

const questionSix = new Question();

questionSix.question = "Which scientific unit is named after an Italian nobleman?";
questionSix.answers.push("Pascal");
questionSix.answers.push("Ohm");
questionSix.answers.push("Volt");
questionSix.answers.push("Hertz");

const questionSeven = new Question();

questionSeven.question = "Which scientific unit is named after an Italian nobleman?";
questionSeven.answers.push("Pascal");
questionSeven.answers.push("Ohm");
questionSeven.answers.push("Volt");
questionSeven.answers.push("Hertz");

const questionEight = new Question();

questionEight.question = "Which of these is not one of the American Triple Crown horse races?";
questionEight.answers.push("Arlington Million");
questionEight.answers.push("Belmont Stakes");
questionEight.answers.push("Kentucky Derby");
questionEight.answers.push("Preakness Stakes");

const questionNine = new Question();

questionNine.question = "Which is the deepest lake in the world?";
questionNine.answers.push("Lake Baikal");
questionNine.answers.push("Lake Superior");
questionNine.answers.push("Caspian Sea");
questionNine.answers.push("Lake Victoria");

const questionTen = new Question();

questionTen.question = "Which boxer was famous for striking the gong in the introduction to J. Arthur Rank films?";
questionTen.answers.push("Bombardier Billy Wells");
questionTen.answers.push("Freddie Mills");
questionTen.answers.push("Terry Spinks");
questionTen.answers.push("Don Cockell");

questions.push(questionOne);
questions.push(questionTwo);
questions.push(questionThree);
questions.push(questionFour);
questions.push(questionFive);
questions.push(questionSix);
questions.push(questionSeven);
questions.push(questionEight);
questions.push(questionNine);
questions.push(questionTen);


var currentQuestion = questions[i];

//Add event handler for selecting answer

answerOne.addEventListener('click', function() {
	this.classList.toggle('selected');
	answerTwo.classList.remove('selected');
	answerThree.classList.remove('selected');
	answerFour.classList.remove('selected');
	this.classList.toggle('unselected');
	answerTwo.classList.add('unselected');
	answerThree.classList.add('unselected');
	answerFour.classList.add('unselected');
});
answerTwo.addEventListener('click', function() {
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerThree.classList.remove('selected');
	answerFour.classList.remove('selected');
	this.classList.toggle('unselected');
	answerOne.classList.add('unselected');
	answerThree.classList.add('unselected');
	answerFour.classList.add('unselected');
});
answerThree.addEventListener('click', function() {
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerTwo.classList.remove('selected');
	answerFour.classList.remove('selected');
	this.classList.toggle('unselected');
	answerOne.classList.add('unselected');
	answerTwo.classList.add('unselected');
	answerFour.classList.add('unselected');
});
answerFour.addEventListener('click', function() {
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerTwo.classList.remove('selected');
	answerThree.classList.remove('selected');
	this.classList.toggle('unselected');
	answerOne.classList.add('unselected');
	answerTwo.classList.add('unselected');
	answerThree.classList.add('unselected');
});


function handleNextQuestion() {

	var _questionNumber = 0;

	var chosenAnswer = document.getElementsByClassName('selected')[0].textContent;

	const _checkAnswer = function _checkAnswer() {


		// Create a list of user answers

		function addRightAnswer() {
			score++;
			var answerBox = document.getElementById("answer-list");
			var li = document.createElement('li');
			var answersQuest = document.createElement('span');
			var answersRightAns = document.createElement('span');
			answerBox.appendChild(li);
			li.appendChild(answersQuest).textContent = (questions[i].question);
			li.appendChild(answersRightAns).textContent = (chosenAnswer);
			answersQuest.classList.add('answers-question');
			answersRightAns.classList.add('right-answer');
		}

		function addWrongAnswer(corrAnsw) {

			var answerBox = document.getElementById("answer-list");
			var li = document.createElement('li');
			var answersQuest = document.createElement('span');
			var answersWrongAns = document.createElement('span');
			var answersCorrectedAns = document.createElement('span');
			answerBox.appendChild(li);
			li.appendChild(answersQuest).textContent = (questions[i].question);
			li.appendChild(answersWrongAns).textContent = (chosenAnswer);
			li.appendChild(answersCorrectedAns).textContent = (corrAnsw);
			answersQuest.classList.add('answers-question');
			answersCorrectedAns.classList.add('corrected-answer');
			answersWrongAns.classList.add('wrong-answer');
		}


		if (i == 0 && answerOne.textContent == chosenAnswer) {
			score++;
			addRightAnswer();
		}
		else if (i == 0 && answerOne.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}
		if (i == 1 && answerThree.textContent == chosenAnswer) {
			score++;
			addRightAnswer();
		}
		else if (i == 0 && answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}

		} else if (i == 1) {
			if (answerThree.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerThree.textContent)
			}
		} else if (i == 2) {
			if (answerThree.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerThree.textContent)
			}
		} else if (i == 3) {
			if (answerOne.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerOne.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}
		} else if (i == 4) {
			if (answerThree.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerThree.textContent)
			}
		} else if (i == 5) {
			if (answerThree.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerThree.textContent)
			}
		} else if (i == 6) {
			if (answerThree.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerThree.textContent !== chosenAnswer) {
				addWrongAnswer(answerThree.textContent)
			}
		} else if (i == 7) {
			if (answerOne.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerOne.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}
		} else if (i == 8) {
			if (answerOne.textContent == chosenAnswer) {
				addRightAnswer()
			} else if (answerOne.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}
		} else if (i == 9) {
			if (answerOne.textContent == chosenAnswer) {

				addRightAnswer()
			} else if (answerOne.textContent !== chosenAnswer) {
				addWrongAnswer(answerOne.textContent)
			}
		}
	};

}


// Check answer



// Display the score

function showScore() {
	answerBox.classList.remove('no-show');
	answerBox.classList.toggle('fade');
	answerBoxTitle.classList.toggle('fade');
	answerBoxTitle.classList.remove('no-show');
	$("#question-number-background").text("");
	(questionText).textContent = ("Quiz completed!");
	(answerOne).textContent = ("You scored: " + score + "/10");
	(answerTwo).innerHTML = ('<button>Show answers</button>');
	(answerThree).textContent = ("");
	(answerFour).textContent = ("");
	answerOne.classList.add('score');
	answerTwo.classList.add('hidden');
	answerTwo.classList.remove('answer');
	answerThree.classList.add('hidden');
	answerFour.classList.add('hidden');
	submit.classList.add("no-show");
	restart.classList.remove("no-show");
	backgroundQNum.classList.add('no-show');

};

// Show answers



// Grab the next question in array

function nextQuestion() {
	if (i < (questions.length)) {
		i++; // increase i by one
		questionAnswers.classList.toggle("fade");
		questionText.classList.toggle("fade");
		submit.classList.toggle("fade");
		setTimeout(function() {
			questionAnswers.classList.toggle("fade");
			submit.classList.toggle("fade");
			questionText.classList.toggle("fade");
			answerOne.classList.remove('selected');
			answerTwo.classList.remove('selected');
			answerThree.classList.remove('selected');
			answerFour.classList.remove('selected');
			answerOne.classList.add('unselected');
			answerTwo.classList.add('unselected');
			answerThree.classList.add('unselected');
			answerFour.classList.add('unselected');
		}, 500);
	} else if (i == (questions.length)) {}
};

// Place next question into HTML

function updateView() {

	const _questionText = function _questionText() {
		if (i < (questions.length)) {

			currentQuestion = questions[i];
			(questionText).textContent = (currentQuestion.question);
			(answerOne).textContent = (currentQuestion.answers[0]);
			(answerTwo).textContent = (currentQuestion.answers[1]);
			(answerThree).textContent = (currentQuestion.answers[2]);
			(answerFour).textContent = (currentQuestion.answers[3]);

		} else if (i == (questions.length)) {
			showScore();
			setTimeout(function() {
				answerBox.classList.toggle('fade');
				answerBoxTitle.classList.toggle('fade');


			}, 500);
		}
	};

	const _questionNumber = function _questionNumber() {

		if (i < 9) {
			backgroundQNum.innerHTML = ("0" + (i + 1) + "<span>/10</span>");
		} else {
			backgroundQNum.innerHTML = ((i + 1) + "<span>/10</span>");
		}
	}

	return {
		questionText: _questionText,
		questionNumber: _questionNumber
	}

}


// Default question

$("#question").text(questions[i].question);
$("#answer-one").text(questions[i].answerOne);
$("#answer-two").text(questions[i].answerTwo);
$("#answer-three").text(questions[i].answerThree);
$("#answer-four").text(questions[i].answerFour);

// Delete an item

// Add event handler to submit button

const init = (function init() {

	const _addEventListeners = function _addEventListeners() {

		submit.addEventListener('click', function() {
			checkAnswer();
			// Check that at least one answer has been selected
			if (answerOne.classList.contains('unselected') &&
				answerTwo.classList.contains('unselected') &&
				answerThree.classList.contains('unselected') &&
				answerFour.classList.contains('unselected')) {
				alert('Please choose an answer first!');
				return;
			}

			nextQuestion();
			setTimeout(function() {
				questNumZero();
				displayQuestion();

			}, 500);
		});

		// Add event handler to restart button

		restart.addEventListener('click', function() {
			// Add text to question and answers	
			i = 0;
			score = 0;
			allAnswers = [];
			wrongAnswers = [];
			displayQuestion();
			questNumZero();

			// Unhide question and answers

			answerOne.classList.remove('score');
			answerOne.classList.remove('answer');
			answerTwo.classList.remove('hidden');
			answerThree.classList.remove('hidden');
			answerFour.classList.remove('hidden');
			backgroundQNum.classList.remove('no-show');
			backgroundQNum.classList.textContent = ('01');
			submit.classList.remove("no-show");
			restart.classList.add("no-show");

			var selectedAnswers = document.getElementsByClassName('selected');
			selectedAnswers.classList.remove('selected');
			answerOne.classList.add('unselected');
			answerTwo.classList.add('unselected');
			answerThree.classList.add('unselected');
			answerFour.classList.add('unselected');

			while (answerList.hasChildNodes())
				answerList.removeChild(answerList.lastChild);

			answerBox.classList.add('no-show');
			answerBoxTitle.classList.add('no-show');

		});
	}

	_addEventListeners();
})();