const tabElements = document.querySelectorAll('button[role="tab"]');
const panelElements = document.querySelectorAll('[role="tabpanel"]');
let activeIndex = 0;

// Listen to clicks on tabs
tabElements.forEach(function (tab, index) {
  tab.addEventListener("click", function (event) {
    setActiveTab(index);
  });
});

function setActiveTab(index) {
  // Make currently active tab inactive
  tabElements[activeIndex].setAttribute("aria-selected", "false");
  tabElements[activeIndex].tabIndex = -1;

  // Set the new tab as active
  tabElements[index].setAttribute("aria-selected", "true");
  tabElements[index].tabIndex = 0;
  tabElements[index].focus();

  setActivePanel(index);
  activeIndex = index;
}

function setActivePanel(index) {
  // Hide currently active panel
  panelElements[activeIndex].setAttribute("hidden", "");
  panelElements[activeIndex].tabIndex = -1;

  // Show the new active panel
  panelElements[index].removeAttribute("hidden");
   panelElements[index].tabIndex = 0;
}

//using keyboard fucntions within the tabs
tabElements.forEach(function (tab, index) {
 

  tab.addEventListener("keydown", function (event) {
    const lastIndex = tabElements.length - 1;

    if (event.code === "ArrowLeft" || event.code === "ArrowUp") {
      event.preventDefault();

      if (activeIndex === 0) {
        // First element, jump to end
        setActiveTab(lastIndex);
      } else {
        // Move left
        setActiveTab(activeIndex - 1);
      }
    } else if (event.code === "ArrowRight" || event.code === "ArrowDown") {
      event.preventDefault();

      if (activeIndex === lastIndex) {
        // Last element, jump to beginning
        setActiveTab(0);
      } else {
        // Move right
        setActiveTab(activeIndex + 1);
      }
    } else if (event.code === "Home") {
      event.preventDefault();

      // Move to beginning
      setActiveTab(0);
    } else if (event.code === "End") {
      event.preventDefault();

      // Move to end
      setActiveTab(lastIndex);
    }
  });
});

// QUESTIONS

const questions = [
  {
    "question": "Which one of these is your favourite dinosaurs?",
    "answer1": "T-REX",
    "answer1Total": "1",
    "answer2": "Triceratops",
    "answer2Total": "2",
    "answer3": "Velociraptor",
    "answer3Total": "3",
    "answer4": "Spinosaurus",
    "answer4Total": "4",
    "answer5": "Alamosaurus",
    "answer5Total": "5"
  },
  {
    "question": "What is your favourite colour?",
    "answer1": "Blue",
    "answer1Total": "1",
    "answer2": "Green",
    "answer2Total": "2",
    "answer3": "Yellow",
    "answer3Total": "3",
    "answer4": "Pink",
    "answer4Total": "4",
    "answer5": "None of the above",
    "answer5Total": "5"
  },
  {
    "question":
      "What is your favourite season?",
    "answer1": "None of them",
    "answer1Total": "1",
    "answer2": "Summer",
    "answer2Total": "3",
    "answer3": "Winter",
    "answer3Total": "2",
    "answer4": "Spring",
    "answer4Total": "5",
    "answer5": "Autumn",
    "answer5Total": "4"
  },
  {
    "question": "You are in the school canteen, Do you...",
    "answer1": "Eat the dinner lady",
    "answer1Total": "3",
    "answer2": "Eat your dinner",
    "answer2Total": "2",
    "answer3":"Eat your friends ear",
    "answer3Total": "4",
    "answer4": "Eat a salad",
    "answer4Total": "0",
    "answer5": "Order a pizza to share",
    "answer5Total": "1"
  },
  {
    "question": "How do you travel?",
    "answer1": "Walking",
    "answer1Total": "1",
    "answer2": "Scaring everyone",
    "answer2Total": "5",
    "answer3": "Asking for a lift",
    "answer3Total": "3",
    "answer4": "Riding a bike",
    "answer4Total": "2",
    "answer5": "Running",
    "answer5Total": "4"
  },
  {
    "question":
      "Whats your ideal holiday",
    "answer1":"Going out and camping with friends",
    "answer1Total": "3",
    "answer2": "Fly somewhere random",
    "answer2Total": "2",
    "answer3": "Stay at home",
    "answer3Total": "1",
    "answer4": "Start hunting in the local forest",
    "answer4Total": "4",
    "answer5": "Sharpening your teeth and practising your running",
    "answer5Total": "5"
  },
  {
    "question": "The world is ending, Do you...",
    "answer1": "See all your friends and family",
    "answer1Total": "1",
    "answer2": "Chase to find your last meal",
    "answer2Total": "5",
    "answer3": "Panic",
    "answer3Total": "3",
    "answer4": "Wait for it to happen",
    "answer4Total": "4",
    "answer5": "Scream for help",
    "answer5Total": "2",
   
  }
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    const option5Total = questions[index].answer5Total;

    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option5.setAttribute('data-total', `${option5Total}`);
    
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
    option5.innerHTML = `${question.answer5}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;
  
        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>`
         if (score > 30) {console.log("You are a T-Rex");} 
  else if (score > 20) {console.log("You are a triceratops");} 
  else if (score > 10) {console.log("You are a Stegosaurus")}
  else if (score > 5) {console.log("You are a velociraptor")}
  else if (score > 2) {console.log("You are a brachiosaurus");} 
  else {console.log("You are an ankylosaurus");}
        `<button class="restart">Restart Quiz </button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
