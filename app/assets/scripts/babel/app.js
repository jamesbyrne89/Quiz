"use strict";

// Declare variables

var views = function setupViews() {
	var viewsObj = {};
	return viewsObj;
}();

var model = function model() {

	var _score = 0;
	var _currentQuestionNumber = 0;

	// Declare list of questions and push to array

	var questions = [];

	function Question() {
		this.question;
		this.index;
		this.answers = [];
		this.userAnswer = null;
		this.correctAnswer;
	}

	// Declare all questions and answers
	var questionOne = new Question();

	questionOne.index = 1;
	questionOne.question = "Who is the patron saint of Spain?";
	questionOne.answers = ["Saint James", "Saint John", "Saint Benedict", "Saint Peter"];

	var questionTwo = new Question();

	questionTwo.index = 2;
	questionTwo.question = "Which king was married to Eleanor of Aquitaine?";
	questionTwo.answers = ["Henry I", "Henry V", "Henry II", "Richard I"];

	var questionThree = new Question();

	questionThree.index = 3;
	questionThree.question = "The Newlyn School of the late 19th century, is associated with which group of people?";
	questionThree.answers = ["Method actors", "Circus entertainers", "Painters", "Musicians"];

	var questionFour = new Question();

	questionFour.index = 4;
	questionFour.question = "If you planted the seeds of Quercus robur, what would grow?";
	questionFour.answers = ["Trees", "Flowers", "Vegetables", "Grain"];

	var questionFive = new Question();

	questionFive.index = 5;
	questionFive.question = "Which of these African countries is situated south of the equator?";
	questionFive.answers = ["Ethiopia", "Nigeria", "Zambia", "Chad"];

	var questionSix = new Question();

	questionSix.index = 6;
	questionSix.question = "Which scientific unit is named after an Italian nobleman?";
	questionSix.answers = ["Pascal", "Ohm", "Volt", "Hertz"];

	var questionSeven = new Question();

	questionSeven.index = 7;
	questionSeven.question = "Which of these creatures are most associated with the naturalist and artist John James Audubon?";
	questionSeven.answers = ["Beetles", "Butterflies", "Birds", "Bats"];

	var questionEight = new Question();

	questionEight.index = 8;
	questionEight.question = "Which of these is not one of the American Triple Crown horse races?";
	questionEight.answers = ["Arlington Million", "Belmont Stakes", "Kentucky Derby", "Preakness Stakes"];

	var questionNine = new Question();

	questionNine.index = 9;
	questionNine.question = "Which is the deepest lake in the world?";
	questionNine.answers = ["Lake Baikal", "Lake Superior", "Caspian Sea", "Lake Victoria"];

	var questionTen = new Question();

	questionTen.index = 10;
	questionTen.question = "Which boxer was famous for striking the gong in the introduction to J. Arthur Rank films?";
	questionTen.answers = ["Bombardier Billy Wells", "Freddie Mills", "Terry Spinks", "Don Cockell"];

	questions.push(questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight, questionNine, questionTen);

	// Fetch all questions
	var _getQuestions = function _getQuestions() {
		return questions;
	};

	// Fetch the user's current score
	var _getScore = function _getScore() {
		return _score;
	};

	// Increase the user's score by one
	var _increaseScore = function _increaseScore() {
		console.log(_score);
		_score++;
	};

	// Go to the next question
	var _nextQuestion = function _nextQuestion() {
		_currentQuestionNumber++;
		if (questions[_currentQuestionNumber - 1]) {
			return questions[_currentQuestionNumber - 1];
		} else {
			_currentQuestionNumber = 0;
			return;
		}
	};

	var _getCurrentQuestion = function _getCurrentQuestion() {
		return questions[_currentQuestionNumber - 1];
	};

	return {
		getQuestions: _getQuestions(),
		getScore: _getScore,
		increaseScore: _increaseScore,
		nextQuestion: _nextQuestion,
		getCurrentQuestion: _getCurrentQuestion
	};
}();

// Place next question into HTML
// 


views.questions = function showQuestionView() {

	// Question view elements
	// 
	var _elems = {
		answerContainer: document.getElementById('answers'),
		answerBoxes: document.getElementsByClassName('answer'),
		questionHolder: document.getElementById('question'),
		submit: document.getElementById('submit-answer'),
		backgroundQNum: document.getElementById('question-number-lg'),
		answerOptions: document.getElementsByClassName('answer')
	};

	var _displayQuestions = function _displayQuestions(currentQuestion) {

		_elems.questionHolder.innerText = currentQuestion.question;
		for (var i = 0; i < _elems.answerBoxes.length; i++) {
			_elems.answerBoxes[i].innerText = currentQuestion.answers[i];
		}
	};

	var _setQuestionNumber = function _setQuestionNumber(num) {
		_elems.backgroundQNum.classList.remove('no-show');
		if (num < 9) {
			_elems.backgroundQNum.innerHTML = "0" + (num + 1) + "<span>/10</span>";
		} else if (num === 9) {
			_elems.backgroundQNum.innerHTML = num + 1 + "<span>/10</span>";
		} else if (!num) {
			_elems.backgroundQNum.classList.add('no-show');
		}
	};

	var _animateIn = function _animateIn() {
		console.log('animating in questions');
		var question = _elems.questionHolder;
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
	};

	var _animateOut = function _animateOut() {
		var question = _elems.questionHolder;
		TweenLite.to(question, 0.5, {
			opacity: 0,
			x: 40,
			ease: Circ.easeIn
		});
	};

	return {
		displayQuestions: _displayQuestions,
		setQuestionNumber: _setQuestionNumber,
		animateIn: _animateIn,
		animateOut: _animateOut,
		element: function element(el) {
			return _elems[el];
		}
	};
}();

views.finished = function showFinishedView() {

	// Finished view elements
	var _elems = {
		questionAnswers: document.getElementById('answers'),
		questAnsWrapper: document.getElementById('question-answer-wrapper'),
		answerList: document.getElementById('answer-list'),
		finalAnswersList: document.getElementById("answer-list"),
		correctAnswersContainer: document.getElementById('correct-answers-box'),
		scoreHolder: document.createElement('span'),
		answersInner: document.getElementById('answers-inner'),
		restart: document.getElementById('restart-quiz')
	};

	var _displayAnswers = function _displayAnswers() {

		// Build list of correct answers
		views.questions.element('backgroundQNum').classList.add('no-show');

		_elems.correctAnswersContainer.classList.remove('no-show');
		var frag = document.createDocumentFragment();
		// Loop through given and correct answers and add to DOM
		for (var i = 0; i < model.getQuestions.length; i++) {

			var li = document.createElement('li');
			var wrongAnswer = '';

			if (model.getQuestions[i].userAnswer !== model.getQuestions[i].correctAnswer) {
				wrongAnswer = "<span class=\"answers-list__answer--incorrect\">" + model.getQuestions[i].userAnswer + "</span>";
			}

			li.innerHTML = "<span class=\"answers-list__question\">" + model.getQuestions[i].question + "</span>" + wrongAnswer + "<span class=\"answers-list__answer--correct\">" + model.getQuestions[i].correctAnswer + "</span>";
			frag.appendChild(li);
		}

		_elems.finalAnswersList.appendChild(frag);
	};

	var _showFinalScore = function _showFinalScore() {

		_elems.answersInner.classList.add('no-show');

		views.questions.element('answerContainer').appendChild(_elems.scoreHolder);

		views.questions.element('questionHolder').textContent = "Quiz completed!";
		_elems.scoreHolder.textContent = "You scored: " + model.getScore() + "/10";
		_elems.scoreHolder.classList.add('score');

		views.questions.element('submit').classList.add("no-show");
		_elems.restart.classList.remove("no-show");
	};

	var _resetView = function _resetView() {
		_elems.answersInner.classList.remove('no-show');
		views.questions.element('answerContainer').removeChild(_elems.scoreHolder);
		_elems.restart.classList.add("no-show");
		views.questions.element('submit').classList.remove("no-show");
		_elems.correctAnswersContainer.classList.add('no-show');
	};

	return {
		showFinalScore: _showFinalScore,
		displayAnswers: _displayAnswers,
		resetView: _resetView,
		element: function element(el) {
			return _elems[el];
		}
	};
}();

views.start = function start() {

	var _elems = {
		startQuiz: document.getElementById('start-quiz')
	};

	var _showWelcomeMessage = function _showWelcomeMessage() {
		views.questions.element('questionHolder').innerText = "A 2014 article in the Daily Telegraph published a list of the 10 hardest questions from 'Who Wants to Be a Millionaire?'.\n\n\t\tHow many can you get right?";
	};

	var _animateIn = function _animateIn() {
		var welcomeMessage = views.questions.element('questionHolder');
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
	};

	var _animateOut = function _animateOut() {
		var welcomeMessage = views.questions.element('questionHolder');
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
	};

	return {
		display: function display() {
			_showWelcomeMessage();

			_animateIn();
		},
		element: function element(el) {
			return _elems[el];
		},
		animateOut: _animateOut
	};
}();

// CONTROLLER

var controller = function controller() {

	// Add event listeners
	var _addEventListeners = function _addEventListeners() {
		var answerOptions = views.questions.element('answerOptions');
		//Add event handlers for selecting answer
		for (var i = 0; i < answerOptions.length; i++) {
			answerOptions[i].addEventListener('click', function () {
				for (var _i = 0; _i < answerOptions.length; _i++) {
					if (answerOptions[_i] === this) {
						this.classList.toggle('selected');
						this.classList.toggle('unselected');
					} else {
						answerOptions[_i].classList.remove('selected');
					}
				}
			});
		}

		// Add event handler for submit button
		views.questions.element('submit').addEventListener('click', function () {
			setTimeout(function () {
				views.questions.animateIn();
			}, 1000);
			_checkAnswer();
			for (var _i2 = 0; _i2 < answerOptions.length; _i2++) {
				answerOptions[_i2].classList.remove('selected');
			}
		});

		views.finished.element('restart').addEventListener('click', function () {
			views.finished.resetView();
			_restart();
		});

		views.start.element('startQuiz').addEventListener('click', function () {
			_handleNextQuestion();
			//this.classList.add('no-show');
			setTimeout(function () {
				views.questions.animateIn();
			}, 1000);
		});
	};

	var _handleNextQuestion = function _handleNextQuestion() {
		var currentQuestion = model.nextQuestion();
		if (!currentQuestion) {
			_handleFinished();
		} else {
			views.start.animateOut();
			setTimeout(function () {
				views.questions.displayQuestions(currentQuestion);
				views.questions.setQuestionNumber(model.getQuestions.indexOf(currentQuestion));
			}, 1000);
		}
	};

	var _handleFinished = function _handleFinished() {
		views.finished.displayAnswers();
		views.finished.showFinalScore();
	};

	var _restart = function _restart() {
		_handleNextQuestion();
	};

	var _checkAnswer = function _checkAnswer() {

		var question = model.getCurrentQuestion();
		var chosenAnswer;
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
	};
}();

controller.init();