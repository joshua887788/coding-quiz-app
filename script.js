
const quiz = [
    {
      question: "Question 1: What is the purpose of the 'querySelector' method in JavaScript?",
      options: ["To add a new element to the Dom", "to remove an element from the DOM", "To select the first element that matches a CSS selector", "to change the styling of an element"],
      correctAnswer: 2
    },
    {
      question: "Question 2: Which HTML element is used to define an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<div>"],
      correctAnswer: 0
    },
    {
      question: "Question 3: What is the correct CSS property to change the text color of an element?",
      options: ["font-color", "text-color", "color", "text-style"],
      correctAnswer: 2
    },
    {
      question: "Question 4: What is the result of the following expression: `5`+ 2?",
      options: ["7", " '52' ", " '5 2' ", "NaN"],
      correctAnswer: 1
    },
    {
      question: "Which attribute is used to specify the source of an external JavaScript file?",
      options: ["src", "href", "link", "script"],
      correctAnswer: 3
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 30; // Initial time in seconds
  
  // Function to render the quiz question
  function renderQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.textContent = "";
  
    const questionText = document.createElement("p");
    questionText.textContent = quiz[currentQuestion].question;
    questionText.style.textAlign = "center";
    questionText.style.fontSize = "24px";
    questionContainer.appendChild(questionText);
  
    const optionsContainer = document.createElement("div");
  
    quiz[currentQuestion].options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => selectOption(index));
      optionsContainer.appendChild(optionButton);
    });
  
    questionContainer.appendChild(optionsContainer);
  }
  
  function startQuiz() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("quiz-container").classList.remove("hidden");
    renderQuestion();
    startTimer();
  }
  
  function startTimer() {
    const timerContainer = document.getElementById("timerContainer");
    timerContainer.textContent = "Time remaining: " + timeLeft + " seconds";
    timerContainer.style.textAlign = "center";
  
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerContainer.textContent = "Time remaining: " + timeLeft + " seconds";
      } else {
        clearInterval(timerInterval);
        timerContainer.textContent = "Time's up!";
        showResult();
      }
    }, 1000);
  }
  
  function selectOption(selectedIndex) {
    if (selectedIndex === quiz[currentQuestion].correctAnswer) {
      score++;
    } else {
      timeLeft -= 5;
    }
  
    currentQuestion++;
  
    if (currentQuestion === quiz.length || timeLeft <= 0) {
      showResult();
    } else {
      renderQuestion();
    }
  }
  
  // Function to show the quiz result and prompt for initials
  function showResult() {
    const initials = prompt("Enter your initials:");
    const result = { initials, score };
    let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardData.push(result);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
    renderLeaderboard();
    leaderboardTitle.removeEventListener("click");
  }
  
  function renderLeaderboard() {
    document.body.textContent = "";
  
    const leaderboardTitle = document.createElement("a");
    leaderboardTitle.href = "#";
    leaderboardTitle.textContent = "Leaderboard ";
    document.body.appendChild(leaderboardTitle);
  
    const restartLink = document.createElement("a");
    restartLink.href = "index.html";
    restartLink.textContent = " Restart Quiz";
    document.body.appendChild(restartLink);
  
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboardContainer";
    leaderboardContainer.style.textAlign = "center";
  
    leaderboardTitle.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default behavior of anchor tag
  
      const leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
      if (leaderboardData.length > 0) {
        const leaderboardTitle = document.createElement("h2");
        leaderboardTitle.textContent = "Past Scores:";
        leaderboardContainer.appendChild(leaderboardTitle);
  
        leaderboardData.forEach((data) => {
          const scoreEntry = document.createElement("p");
          scoreEntry.textContent = data.initials + ": " + data.score;
          leaderboardContainer.appendChild(scoreEntry);
        });
      } else {
        const noScoresMessage = document.createElement("p");
        noScoresMessage.textContent = "No scores yet.";
        leaderboardContainer.appendChild(noScoresMessage);
      }
    });
  
    document.body.appendChild(leaderboardContainer);
  }
  
  // Add event listener to the start button
  const startBtn = document.getElementById("startBtn"); 
  startBtn.addEventListener("click", startQuiz);
   


  
