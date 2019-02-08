(function() {
  'use strict';

  var question = document.getElementById('question');
  var btn = document.getElementById('btn');
  var answers = document.querySelectorAll('#answers > li');
  var shuffledAnswers;
  var result = document.getElementById('result');
  var scoreLabel = document.querySelector('#result > p');
  //ダウンロードボタン
  var result_download = document.getElementById('result_download');

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
        scoreLabel.textContent = 'Score: ' + score + ' / ' + quizSet.length;
        result.classList.add('show');
      } else {
        setQuiz();
      }
    });
    result_download.addEventListener('click', function() {
      setBlob('result_download', 'サンプルテキスト。本日は晴天なり。');
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

  function setBlob(id, result_download) {
    var blob = new Blob([result_download], {
      'type': 'text/plain'
    });
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, "your_score.txt");
      // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
      window.navigator.msSaveOrOpenBlob(blob, "your_score.txt");
    } else {
      window.URL = window.URL || window.webkitURL;
      $('#' + id).attr('href', window.URL.createObjectURL(blob));
    }
  }

  setInterval('setGreetings()', 1000);
  setQuiz();
  setEvents();

})();

function setGreetings() {
  //挨拶出力用
  var nowTime = new Date();
  var nowHour = nowTime.getHours();
  var nowMin = nowTime.getMinutes();
  var nowSec = nowTime.getSeconds();
  var greetMsg = "";
  if (nowHour >= 5 & nowHour < 10) {
    greetMsg = "労働者諸君、おはようございます。";
  } else if (nowHour >= 10 & nowHour < 18) {
    greetMsg = "労働者諸君、こんにちは。";
  } else {
    greetMsg = "労働者諸君、こんばんは。";
  }
  var dispTime = greetMsg + "今" + nowHour + "時" + nowMin + "分" + nowSec + "秒です。";
  document.getElementById("greetings").textContent = dispTime;
}
