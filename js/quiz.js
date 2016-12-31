$(document).ready(function(){

// Declare variables
var i = 0;
var score = 0;

const questionText = document.getElementById('question');

const answerOne = document.getElementById('answer-one');
const answerTwo = document.getElementById('answer-two');
const answerThree = document.getElementById('answer-three');
const answerFour = document.getElementById('answer-four');

const submit = document.getElementById('submit-answer');

const backgroundQNum = document.getElementById('question-number-background');

// Declare list of questions

const questions = new Array(

question1 = {
question: "Who is the patron saint of Spain?",
answerOne: "Saint James",
answerTwo: "Saint John",
answerThree: "Saint Benedict",
answerFour: "Saint Peter"
},
question2 = {
question: "Which king was married to Eleanor of Aquitaine?",
answerOne: "Henry I",
answerTwo: "Henry V",
answerThree: "Henry II",
answerFour: "Richard I"
},
question3 = {
question: "The Newlyn School of the late 19th century, is associated with which group of people?",
answerOne: "Method actors",
answerTwo: "Circus entertainers",
answerThree: "Painters",
answerFour: "Musicians"
},
question4 = {
question: "If you planted the seeds of Quercus robur, what would grow?",
answerOne: "Trees",
answerTwo: "Flowers",
answerThree: "Vegetables",
answerFour: "Grain"
},
question5 = {
question: "Which of these African countries is situated south of the equator?",
answerOne: "Ethiopia",
answerTwo: "Nigeria",
answerThree: "Zambia",
answerFour: "Chad"
},
question6 = {
question: "Which scientific unit is named after an Italian nobleman?",
answerOne: "Pascal",
answerTwo: "Ohm",
answerThree: "Volt",
answerFour: "Hertz"
},

question7 = {
question: "Which of these creatures are most associated with the naturalist and artist John James Audubon?",
answerOne: "Beetles",
answerTwo: "Butterflies",
answerThree: "Birds",
answerFour: "Bats"
},

question8 = {
question: "Which of these is not one of the American Triple Crown horse races?",
answerOne: "Arlington Million",
answerTwo: "Belmont Stakes",
answerThree: "Kentucky Derby",
answerFour: "Preakness Stakes"
},

question9 = {
question: "Which is the deepest lake in the world?",
answerOne: "Lake Baikal",
answerTwo: "Lake Superior",
answerThree: "Caspian Sea",
answerFour: "Lake Victoria"
},

question10 = {
question: "Which boxer was famous for striking the gong in the introduction to J. Arthur Rank films?",
answerOne: "Bombardier Billy Wells",
answerTwo: "Freddie Mills",
answerThree: "Terry Spinks",
answerFour: "Don Cockell"
}
);

var currentQuestion = questions[i];

//Add event handler for selecting answer

answerOne.addEventListener('click', function(){
	this.classList.toggle('selected');
	answerTwo.classList.remove('selected');
	answerThree.classList.remove('selected');
	answerFour.classList.remove('selected');
});
answerTwo.addEventListener('click', function(){
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerThree.classList.remove('selected');
	answerFour.classList.remove('selected');	
});
answerThree.addEventListener('click', function(){
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerTwo.classList.remove('selected');
	answerFour.classList.remove('selected');	
});
answerFour.addEventListener('click', function(){
	this.classList.toggle('selected');
	answerOne.classList.remove('selected');
	answerTwo.classList.remove('selected');
	answerThree.classList.remove('selected');	
});

// Check answer

function checkAnswer(){
		
		if ((questionText.textContent == question1.question) && answerOne.classList.contains('selected')) {
			score ++;
	} 
	else if ((questionText.textContent == question1.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question2.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question3.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question4.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question5.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question6.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question7.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question8.question) && answerOne.classList.contains('selected')) {
			score ++;
			}	
	else if ((questionText.textContent == question9.question) && answerOne.classList.contains('selected')) {
			score ++;
			}
	else if ((questionText.textContent == question10.question) && answerOne.classList.contains('selected')) {
			score ++;
			}																							
	else {
		return;
	}
};

// Grab the next question in array

function nextQuestion() {
	if (i < (questions.length - 1)){
		// Check that at least one answer has been selected
		if ((answerOne).classList.contains('selected') ||
	(answerTwo).classList.contains('selected') ||
	(answerThree).classList.contains('selected') ||
	(answerFour).classList.contains('selected')){
    i ++; // increase i by one
    $("#question-number-background").text("Q" + (i + 1));
    currentQuestion = questions[i];
        (questionText).textContent=(currentQuestion.question);
        (answerOne).textContent=(currentQuestion.answerOne);
        (answerTwo).textContent=(currentQuestion.answerTwo);
        (answerThree).textContent=(currentQuestion.answerThree);
        (answerFour).textContent=(currentQuestion.answerFour);
    }
    else {
alert('please choose');
return;
}
    }
    else if (i == (questions.length - 1)) {
    	$("#question-number-background").text("");
    	        (questionText).textContent=("Quiz completed!");
        (answerOne).textContent=("");
        (answerTwo).textContent=("You scored: " + score + "/10");
        (answerThree).textContent=("");
        (answerFour).textContent=("");
	answerOne.classList.add('hidden');
	answerTwo.classList.add('score');
	answerTwo.classList.remove('answer');	
	answerThree.classList.add('hidden');
	answerFour.classList.add('hidden');
	(submit).textContent=("Start again");
	backgroundQNum.classList.add('no-show');
    }
else{
	return;
}};

// Default question

		$("#question").text(questions[i].question);
        $("#answer-one").text(questions[i].answerOne);
        $("#answer-two").text(questions[i].answerTwo);
        $("#answer-three").text(questions[i].answerThree);
        $("#answer-four").text(questions[i].answerFour);

// Add event handler to submit button

submit.addEventListener('click', function(){
			checkAnswer();
			nextQuestion();
	answerOne.classList.remove('selected');
	answerTwo.classList.remove('selected');
	answerThree.classList.remove('selected');
	answerFour.classList.remove('selected');

});

// Add event handler to restart button



        $("#answers").removeClass("executed");
        //$("#answers").toggleClass("after");
        


});