(function() {
  'use strict';

  var question = document.getElementById('btn_output');
  var question = document.getElementById('question');
  var btn = document.getElementById('btn');
  var answers = document.querySelectorAll('#answers > li');
  var shuffledAnswers;
  var result = document.getElementById('result');
  var scoreLabel = document.querySelector('#result > p');

  var quizSet = ITEM;

  //1206↓出題順のシャッフルと再出題抑制は、これであっさり行けた。
  quizSet = shuffle(quizSet);

  var currentNum = 0;
  var isAnswered;
  var score = 0;

  function shuffle(arr) {
    var i;
    var j;
    var tmp;
    for (i = arr.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function setQuiz() {
    var i;
    question.textContent = quizSet[currentNum].q;
    shuffledAnswers = shuffle(quizSet[currentNum].a.slice());
    isAnswered = false;
    for (i = 0; i < answers.length; i++) {
      answers[i].classList.remove('correct');
      answers[i].classList.remove('wrong');
      answers[i].textContent = shuffledAnswers[i];
    }
    btn.classList.add('disabled');
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  function setEvents() {
    var i;
    for (i = 0; i < answers.length; i++) {
      answers[i].addEventListener('click', function() {
        checkAnswer(this);
      });
    }
    btn.addEventListener('click', function() {
      if (this.classList.contains('disabled')) {
        return;
      }
      // setQuiz();
      if (currentNum === quizSet.length) {
        // show score
        // console.log('Score: ' + score + ' / ' + quizSet.length);
        scoreLabel.textContent = 'Score: ' + score + ' / ' + quizSet.length;
        result.classList.add('show');
      } else {
        setQuiz();
      }
    });
  }

  function checkAnswer(node) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (node.textContent === quizSet[currentNum].a[0]) {
      node.textContent += ' ... Correct!';
      node.classList.add('correct');
      score++;
    } else {
      node.textContent += ' ... Wrong!';
      node.classList.add('wrong');
    }
    btn.classList.remove('disabled');
    currentNum++;
  }

  setQuiz();
  setEvents();

})();

function setGreetings(){
  //挨拶出力用
  var nowTime = new Date();
  var nowHour = nowTime.getHours();
  var nowMin = nowTime.getMinutes();
  var nowSec = nowTime.getSeconds();
  var greetMsg = "";
  if (nowHour >= 5 & nowHour < 10){
    greetMsg = "おはようございます。";
  } else if(nowHour >= 10 & nowHour < 18){
    greetMsg = "こんにちは。";
  } else{
    greetMsg = "こんばんは。";
  }
  var dispTime = greetMsg + "今" + nowHour + "時" + nowMin + "分" + nowSec + "秒です。";
  document.getElementById("greetings").textContent = dispTime;

}
setInterval('setGreetings()',1000);

// 問題の出力
function setOutQuestion(){
  btn_Output.addEventListener('click', function() {
    // alert('JavaScriptのアラート');
    window.confirm("問題を出力しますか？")
  });
}
setOutQuestion();
