(function(){
    function startQuiz(){
      // variable for HTML
      const output = [];
  
      // for each question...
      quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // available answer...
          for(letter in currentQuestion.answers){
  
            // radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function theResults(){
  
      // answers from the quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // user's answers
      let numberRight = 0;
  
      // each question
      quizQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is right
        if(userAnswer === currentQuestion.rightAnswer){
          // add to the number of correct answers
          numberRight++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // number of correct answers
      resultsContainer.innerHTML = `${numberRight} out of ${quizQuestions.length}`;
    }
  
    function quizSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
   // advances the slide to next question
    function nextSlide() {
      quizSlide(currentSlide + 1);
    }
  
  // returns slide to prefious question
    function previousSlide() {
      quizSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const quizQuestions = [
    // the questions
    {
      question: "Which of below are established Linux distributions?",
      answers: {
       a: "Ubuntu, Fedora, Solus, FreeBSD, Mint, Manjaro",
       b: "Fedora, Solus, OS2, Mint, Manjaro, MX Linux",        
       c: "Ubuntu, Fedora, Solus, Mint, PopOS, Manjaro",
       d: "Mint, Manjaro, MX Linux, Ubuntu, Windows 11, Zorin",
},
      rightAnswer: "c"
    },

    {
      question: "FSF stand for ?",
      answers: {
       a: "First Serve First",
       b: "Free Software File",        
       c: "Free Software Foundation",
       d: "None of the above",
},
      rightAnswer: "c"
    },
    {
      question: "Which are package managers?",
      answers: {
       a: "RPM, dpkg, Pacman, APT, YUM",
       b: "eopkg, pkgs, APT, RPM, YUM ",
       c: "RPM, dpkg,Pacman, DTS, eopkg ",    
       d: "dpkg, BSD, DNF, APT, YUM ",
},
      rightAnswer: "a"
    },
    {
      question: "Who Developed the Linux Kernal",
      answers: {
        a: "Steve Jobs",
        b: "Linus Torvalds",
        c: "Bill Gates",
        d: "David Packard",
      },
      rightAnswer: "b"

    },

    {
      question: "Linux is a _____ and _____ operating system",
      answers: {
        a: "Single User and Multitasking",
        b: "Multiuser and Multitasking",
        c: "Multiuser and Single Tasking",
        d: "None of the above",
      },
      rightAnswer: "b"

    },

    {
      question: "Core of the linux operating system is ........",
      answers: {
        a: "Bash Shell",
        b: "Command Line",
        c: "The Kernal",
        d: "The Terminal",
      },
      rightAnswer: "c"

    },
      {
        question: "Which are the four distos that most others distos are dirived from?",
        answers: {
          a: "Ubuntu, Arch, Manjaro, Redhat",
          b: "Manjaro, Debian, Ubuntu, MX Linux",
          c: "PopOS, Mint, Manjaro, Redhat",
          d: "Ubuntu, Arch, Debian, Redhat",
        },
        rightAnswer: "d"
      }
    ];
  
    // Kick things off
    startQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    quizSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', theResults);
    previousButton.addEventListener("click", previousSlide);
    nextButton.addEventListener("click", nextSlide);
  })();
  