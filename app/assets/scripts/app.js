// Declare variables


const model = (function model() {


	let _score = 0;
	let _currentQuestionNumber = 0;

	// Declare list of questions and push to array

	const questions = [];

	function Question() {
		this.question;
		this.index;
		this.answers = [];
		this.userAnswer = null;
		this.correctAnswer;
	}

	// Declare all questions and answers
	const questionOne = new Question();

	questionOne.index = 1;
	questionOne.question = "Who is the patron saint of Spain?";
	questionOne.answers = ["Saint James", "Saint John", "Saint Benedict", "Saint Peter"];

	const questionTwo = new Question();

	questionTwo.index = 2;
	questionTwo.question = "Which king was married to Eleanor of Aquitaine?";
	questionTwo.answers = ["Henry I", "Henry V", "Henry II", "Richard I"];

	const questionThree = new Question();

	questionThree.index = 3;
	questionThree.question = "The Newlyn School of the late 19th century, is associated with which group of people?";
	questionThree.answers = ["Method actors", "Circus entertainers", "Painters", "Musicians"];

	const questionFour = new Question();

	questionFour.index = 4;
	questionFour.question = "If you planted the seeds of Quercus robur, what would grow?";
	questionFour.answers = ["Trees", "Flowers", "Vegetables", "Grain"];

	const questionFive = new Question();

	questionFive.index = 5;
	questionFive.question = "Which of these African countries is situated south of the equator?";
	questionFive.answers = ["Ethiopia", "Nigeria", "Zambia", "Chad"];

	const questionSix = new Question();

	questionSix.index = 6;
	questionSix.question = "Which scientific unit is named after an Italian nobleman?";
	questionSix.answers = ["Pascal", "Ohm", "Volt", "Hertz"];

	const questionSeven = new Question();

	questionSeven.index = 7;
	questionSeven.question = "Which of these creatures are most associated with the naturalist and artist John James Audubon?";
	questionSeven.answers = ["Beetles", "Butterflies", "Birds", "Bats"];

	const questionEight = new Question();

	questionEight.index = 8;
	questionEight.question = "Which of these is not one of the American Triple Crown horse races?";
	questionEight.answers = ["Arlington Million", "Belmont Stakes", "Kentucky Derby", "Preakness Stakes"];

	const questionNine = new Question();

	questionNine.index = 9;
	questionNine.question = "Which is the deepest lake in the world?";
	questionNine.answers = ["Lake Baikal", "Lake Superior", "Caspian Sea", "Lake Victoria"];

	const questionTen = new Question();

	questionTen.index = 10;
	questionTen.question = "Which boxer was famous for striking the gong in the introduction to J. Arthur Rank films?";
	questionTen.answers = ["Bombardier Billy Wells", "Freddie Mills", "Terry Spinks", "Don Cockell"];

	questions.push(questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen);

	// Fetch all questions
	const _getQuestions = function _getQuestions() {
		return questions;
	}

	// Fetch the user's current score
	const _getScore = function _getScore() {
		return _score;
	}

	// Increase the user's score by one
	const _increaseScore = function _increaseScore() {
		_score++;
	}

	// Go to the next question
	const _nextQuestion = function _nextQuestion() {
		_currentQuestionNumber++;
		if (questions[_currentQuestionNumber - 1]) {
			console.log(questions[_currentQuestionNumber - 1])
			return questions[_currentQuestionNumber - 1];
		} else {
			_currentQuestionNumber = 0;
			return;
		}
	}


	const _getCurrentQuestion = function _getCurrentQuestion() {
		return questions[_currentQuestionNumber - 1];
	}

	return {
		getQuestions: _getQuestions(),
		getScore: _getScore,
		increaseScore: _increaseScore,
		nextQuestion: _nextQuestion,
		getCurrentQuestion: _getCurrentQuestion
	}
})();



// Place next question into HTML

const view = (function view() {


	const answerBox = document.getElementById('answers');
	const answerBoxes = document.getElementsByClassName('answer');
	const questionHolder = document.getElementById('question');
	const restart = document.getElementById('restart-quiz');
	const submit = document.getElementById('submit-answer');
	const correctAnswersBox = document.getElementById('correct-answers-box');

		const score = document.createElement('span');	

			const answersInner = document.getElementById('answers-inner');

	const questionView = function questionView(currentQuestion) {

		questionHolder.innerText = currentQuestion.question;
		for (var i = 0; i < answerBoxes.length; i++) {
			answerBoxes[i].innerText = currentQuestion.answers[i]
		}
	}

	const _setQuestionNumber = function _setQuestionNumber(num) {
		const backgroundQNum = document.getElementById('question-number-lg');
		backgroundQNum.style.display = 'block';
		if (num < 9) {
			backgroundQNum.innerHTML = ("0" + (num + 1) + "<span>/10</span>");
		} else if (num === 9) {
			backgroundQNum.innerHTML = ((num + 1) + "<span>/10</span>");
		} else if (!num) {
			backgroundQNum.style.display = 'none';
		}
	};



	const _displayAnswers = function _displayAnswers() {
		// Build list of correct answers
		const questionAnswers = document.getElementById('answers');
		const questAnsWrapper = document.getElementById('question-answer-wrapper');
		const answerList = document.getElementById('answer-list');
		var finalAnswersList = document.getElementById("answer-list");
		var frag = document.createDocumentFragment();
		var wrongAnswer = '';

		correctAnswersBox.classList.remove('no-show');

		for (let i = 0; i < model.getQuestions.length; i++) {

			var li = document.createElement('li');

			if (model.getQuestions[i].userAnswer !== model.getQuestions[i].correctAnswer) {
				wrongAnswer = `<span class="answers-list__answer--incorrect">${model.getQuestions[i].userAnswer}</span>`;
			}
			li.innerHTML = `<span class="answers-list__question">${model.getQuestions[i].question}</span>${wrongAnswer}<span class="answers-list__answer--correct">${model.getQuestions[i].correctAnswer}</span>`;
			frag.appendChild(li);
		}

		finalAnswersList.appendChild(frag);

	};

	const _showFinalScore = function _showFinalScore() {

		answersInner.classList.add('no-show');

		answerBox.appendChild(score);

		questionHolder.textContent = "Quiz completed!";
		score.textContent = ("You scored: " + model.getScore() + "/10");
		score.classList.add('score');

		submit.classList.add("no-show");
		restart.classList.remove("no-show");

	};

	const _resetView = function _resetView() {
				answersInner.classList.remove('no-show');
				answerBox.removeChild(score);
				restart.classList.add("no-show");
				submit.classList.remove("no-show");
				correctAnswersBox.classList.add('no-show');
	}

	return {
		setQuestionNumber: _setQuestionNumber,
		questionView: questionView,
		showFinalScore: _showFinalScore,
		displayAnswers: _displayAnswers,
		resetView: _resetView
	}

})();



const controller = (function controller() {

	var _questionNumber = 0;
	const submit = document.getElementById('submit-answer');
	const restart = document.getElementById('restart-quiz');
	const answerOptions = document.getElementsByClassName('answer');

	// Add event listeners
	const _addEventListeners = function _addEventListeners() {

		//Add event handlers for selecting answer
		for (let i = 0; i < answerOptions.length; i++) {
			answerOptions[i].addEventListener('click', function() {
				for (let i = 0; i < answerOptions.length; i++) {
					if (answerOptions[i] === this) {
						this.classList.toggle('selected');
						this.classList.toggle('unselected');

					} else {
						answerOptions[i].classList.remove('selected');

					}
				}
			});
		}

		// Add event handler for submit button
		submit.addEventListener('click', function() {
			_checkAnswer();
			_handleNextQuestion();

			for (let i = 0; i < answerOptions.length; i++) {
				answerOptions[i].classList.remove('selected');
			}
		});

		restart.addEventListener('click', function() {
			view.resetView();
			_restart();

		})
	};


	const _handleNextQuestion = function _handleNextQuestion() {
		let currentQuestion = model.nextQuestion();
		if (!currentQuestion) {
			_handleFinished();
		} else {
			view.questionView(currentQuestion);
			view.setQuestionNumber(model.getQuestions.indexOf(currentQuestion));
		}
	};

	const _handleFinished = function _handleFinished() {
		view.setQuestionNumber();
		view.displayAnswers();
		view.showFinalScore();

	}

	const _restart = function _restart() {
		_handleNextQuestion();

	}

	const _checkAnswer = function _checkAnswer() {

		var question = model.getCurrentQuestion();
		var answer = document.getElementsByClassName('selected')[0].innerText;
		model.getCurrentQuestion().userAnswer = answer;


		// Check whether user's answer is correct
		// Answer 1
		if (question.index === 1 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		} else if (question.index === 1 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 2
		else if (question.index === 2 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 2 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 3
		else if (question.index === 3 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[3];
		} else if (question.index === 3 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 4
		else if (question.index === 4 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 4 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 5
		else if (question.index === 5 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 5 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 6
		else if (question.index === 6 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 6 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 7
		else if (question.index === 7 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 7 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 8
		else if (question.index === 8 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 8 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 9
		else if (question.index === 9 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 9 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		}
		// Answer 10
		else if (question.index === 10 && answer === question.answers[0]) {
			model.increaseScore();
			model.getCurrentQuestion().correctAnswer = question.answers[2];
		} else if (question.index === 10 && answer !== question.answers[0]) {
			model.getCurrentQuestion().correctAnswer = question.answers[0];
		} else {
			return;
		}
	};

	return {
		init: function() {
			_addEventListeners();
			_handleNextQuestion();
		},
		handleNextQuestion: _handleNextQuestion
	}

})();

controller.init();