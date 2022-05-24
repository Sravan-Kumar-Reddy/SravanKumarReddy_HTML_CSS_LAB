function Quiz(questions){
    this.score=0;
    this.questions=questions;
    this.questionIndex=0;
}
function Question(questionText,choices,answer){
    this.questionText = questionText;
    this.answer = answer;
    this.choices = choices;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}

Question.prototype.isCorrectAnswer = function(userAnswer){
    return this.answer === userAnswer;
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
  ];

let quiz = new Quiz(questions);

function loadQuestion(){
  if(quiz.isEnded()){
      showScore();
  }else{
      let question = quiz.getQuestionByIndex();
      var questionElement = document.getElementById("questionDiv").getElementsByTagName("p");
      questionElement[0].innerHTML = question.questionText;
      var choices = question.choices;
    //   var optionsElements = document.getElementById("optionsDiv").getElementsByTagName("button");
      for(var i=0;i<choices.length;i++){
          document.getElementById("choice"+i).innerHTML = choices[i];
          handleOnClick("btn"+i,choices[i]);
      }
    showProgress();

  }

}
function handleOnClick(id,choice){
    let buttonElement = document.getElementById(id);
    
    // for(var i=0;i<buttonElements.length;i++){
        buttonElement.onclick=function(){
            quiz.checkOptionWithAnswer(choice);
            console.log(quiz.score);
            loadQuestion();
        };
    // }
}
function showScore(){
    let score = quiz.score;
    let pageTitle = document.getElementById("pageTitle").innerHTML = "Result";
    let scorePercentage = (score/questions.length)*100;
    document.getElementById("questionSection").innerHTML = "<div id='header'>"+
    "<h1 id='pageTitle'>Result</h1>"+
    "</div><div id='resultText'>Your Score: "+ score + "<br> Score Percentage: "+ scorePercentage+"</div>";

}
function showProgress(){
    document.getElementById("paginationText").innerHTML = "Question "+(quiz.questionIndex+1)+" of "+questions.length;
}
document.onload = loadQuestion();

