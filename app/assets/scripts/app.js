// Declare variables

const views = (function setupViews() {
	let viewsObj = {};
	return viewsObj;
})();

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
		console.log(_score)
		_score++;
	}

	// Go to the next question
	const _nextQuestion = function _nextQuestion() {
		_currentQuestionNumber++;
		if (questions[_currentQuestionNumber - 1]) {
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
// 



views.questions = (function showQuestionView() {

	// Question view elements
	// 
	let _elems = {
		answerContainer: document.getElementById('answers'),
		answerBoxes: document.getElementsByClassName('answer'),
		questionHolder: document.getElementById('question'),
		submit: document.getElementById('submit-answer'),
		backgroundQNum: document.getElementById('question-number-lg'),
		answerOptions: document.getElementsByClassName('answer')
	};

	const _displayQuestions = function _displayQuestions(currentQuestion) {

		_elems.questionHolder.innerText = currentQuestion.question;
		for (var i = 0; i < _elems.answerBoxes.length; i++) {
			_elems.answerBoxes[i].innerText = currentQuestion.answers[i]
		}
	};

	const _setQuestionNumber = function _setQuestionNumber(num) {
		_elems.backgroundQNum.classList.remove('no-show');
		if (num < 9) {
			_elems.backgroundQNum.innerHTML = ("0" + (num + 1) + "<span>/10</span>");
		} else if (num === 9) {
			_elems.backgroundQNum.innerHTML = ((num + 1) + "<span>/10</span>");
		} else if (!num) {
			_elems.backgroundQNum.classList.add('no-show');
		}
	};

	const _animateIn = function _animateIn() {
		console.log('animating in questions')
		let question = _elems.questionHolder;
		TweenLite.to(question, 0.5, {
			opacity: 1,
			x: -40,
			ease: Circ.easeIn
		});
		TweenLite.to(_elems.submit, 0.5, {
			opacity: 1,
			y: -15,
			ease: Circ.easeIn
		});
	}

	const _animateOut = function _animateOut() {
		let question = _elems.questionHolder;
		TweenLite.to(question, 0.5, {
			opacity: 0,
			x: 40,
			ease: Circ.easeIn
		});
	}

	return {
		displayQuestions: _displayQuestions,
		setQuestionNumber: _setQuestionNumber,
		animateIn: _animateIn,
		animateOut: _animateOut,
		element: function(el) {
			return _elems[el];
		}
	};

})();


views.finished = (function showFinishedView() {

	// Finished view elements
	let _elems = {
		questionAnswers: document.getElementById('answers'),
		questAnsWrapper: document.getElementById('question-answer-wrapper'),
		answerList: document.getElementById('answer-list'),
		finalAnswersList: document.getElementById("answer-list"),
		correctAnswersContainer: document.getElementById('correct-answers-box'),
		scoreHolder: document.createElement('span'),
		answersInner: document.getElementById('answers-inner'),
		restart: document.getElementById('restart-quiz')
	};



	const _displayAnswers = function _displayAnswers() {

		// Build list of correct answers
		views.questions.element('backgroundQNum').classList.add('no-show');

		_elems.correctAnswersContainer.classList.remove('no-show');
		let frag = document.createDocumentFragment();
		// Loop through given and correct answers and add to DOM
		for (let i = 0; i < model.getQuestions.length; i++) {

			var li = document.createElement('li');
			let wrongAnswer = '';


			if (model.getQuestions[i].userAnswer !== model.getQuestions[i].correctAnswer) {
				wrongAnswer = `<span class="answers-list__answer--incorrect">${model.getQuestions[i].userAnswer}</span>`;
			}

			li.innerHTML = `<span class="answers-list__question">${model.getQuestions[i].question}</span>${wrongAnswer}<span class="answers-list__answer--correct">${model.getQuestions[i].correctAnswer}</span>`;
			frag.appendChild(li);
		}

		_elems.finalAnswersList.appendChild(frag);

	};

	const _showFinalScore = function _showFinalScore() {

		_elems.answersInner.classList.add('no-show');

		views.questions.element('answerContainer').appendChild(_elems.scoreHolder);

		views.questions.element('questionHolder').textContent = "Quiz completed!";
		_elems.scoreHolder.textContent = ("You scored: " + model.getScore() + "/10");
		_elems.scoreHolder.classList.add('score');

		views.questions.element('submit').classList.add("no-show");
		_elems.restart.classList.remove("no-show");

	};

	const _resetView = function _resetView() {
		_elems.answersInner.classList.remove('no-show');
		views.questions.element('answerContainer').removeChild(_elems.scoreHolder);
		_elems.restart.classList.add("no-show");
		views.questions.element('submit').classList.remove("no-show");
		_elems.correctAnswersContainer.classList.add('no-show');
	}

	return {
		showFinalScore: _showFinalScore,
		displayAnswers: _displayAnswers,
		resetView: _resetView,
		element: function(el) {
			return _elems[el];
		}
	}

})();


views.start = (function start() {

	let _elems = {
		startQuiz: document.getElementById('start-quiz')
	}

	const _showWelcomeMessage = function _showWelcomeMessage() {
		views.questions.element('questionHolder').innerText = `A 2014 article in the Daily Telegraph published a list of the 10 hardest questions from 'Who Wants to Be a Millionaire?'.

		How many can you get right?`;
	}

	const _animateIn = function _animateIn() {
		let welcomeMessage = views.questions.element('questionHolder');
		TweenLite.to(welcomeMessage, 0.5, {
			opacity: 1,
			x: -60,
			ease: Circ.easeIn
		});
		TweenLite.to(_elems.startQuiz, 0.5, {
			opacity: 1,
			y: -15,
			delay: 0.75,
			ease: Circ.easeInOut
		});
	}

	const _animateOut = function _animateOut() {
		let welcomeMessage = views.questions.element('questionHolder');
		TweenLite.to(welcomeMessage, 0.5, {
			opacity: 0,
			x: 60,
			ease: Circ.easeIn
		});
		TweenLite.to(_elems.startQuiz, 0.5, {
			opacity: 0,
			y: 15,
			x: 0,
			delay: 0.5
		});
	}

	return {
		display: function() {
			_showWelcomeMessage();

			_animateIn();


		},
		element: function(el) {
			return _elems[el];
		},
		animateOut: _animateOut
	}

})();



// CONTROLLER

const controller = (function controller() {

	// Add event listeners
	const _addEventListeners = function _addEventListeners() {
		let answerOptions = views.questions.element('answerOptions');
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
		views.questions.element('submit').addEventListener('click', function() {
			setTimeout(function(){
			views.questions.animateIn();
		}, 1000);
			_checkAnswer();
			for (let i = 0; i < answerOptions.length; i++) {
				answerOptions[i].classList.remove('selected');
			}

		});

		views.finished.element('restart').addEventListener('click', function() {
			views.finished.resetView();
			_restart();

		});

		views.start.element('startQuiz').addEventListener('click', function() {
			_handleNextQuestion();
			//this.classList.add('no-show');
			setTimeout(function(){
			views.questions.animateIn();
		}, 1000);
		});
	};


	const _handleNextQuestion = function _handleNextQuestion() {
		let currentQuestion = model.nextQuestion();
		if (!currentQuestion) {
			_handleFinished();
		} else {
			views.start.animateOut();
			setTimeout(function(){
			views.questions.displayQuestions(currentQuestion);
			views.questions.setQuestionNumber(model.getQuestions.indexOf(currentQuestion));
		}, 1000)
		}
	};

	const _handleFinished = function _handleFinished() {
		views.finished.displayAnswers();
		views.finished.showFinalScore();

	}

	const _restart = function _restart() {
		_handleNextQuestion();

	}

	const _checkAnswer = function _checkAnswer() {

		var question = model.getCurrentQuestion();
		var chosenAnswer
		if (!document.getElementsByClassName('selected')[0]) {
			return;
		} else {
			chosenAnswer = document.getElementsByClassName('selected')[0].innerText;
			_handleNextQuestion();
			model.getCurrentQuestion().userAnswer = chosenAnswer;

			// Check whether user's chosenAnswer is correct

			// Answer 1
			if (question.index === 1 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[0];

			} else if (question.index === 1 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 2
			else if (question.index === 2 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 2 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 3
			else if (question.index === 3 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[3];
			} else if (question.index === 3 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 4
			else if (question.index === 4 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 4 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 5
			else if (question.index === 5 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 5 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 6
			else if (question.index === 6 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 6 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 7
			else if (question.index === 7 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 7 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 8
			else if (question.index === 8 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 8 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 9
			else if (question.index === 9 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 9 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			}
			// Answer 10
			else if (question.index === 10 && chosenAnswer === question.answers[0]) {
				model.increaseScore();
				model.getCurrentQuestion().correctAnswer = question.answers[2];
			} else if (question.index === 10 && chosenAnswer !== question.answers[0]) {
				model.getCurrentQuestion().correctAnswer = question.answers[0];
			} else {
				return;
			}
		}
	};

	return {
		handleNextQuestion: _handleNextQuestion,
		init: function init() {
			views.start.display();
			_addEventListeners();
		},
		startQuiz: function startQuiz() {
			handleNextQuestion();
		}
	}

})();

controller.init();