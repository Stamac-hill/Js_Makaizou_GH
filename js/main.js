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
  var answerStatus = "";//解答状況

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
    //ダウンロードボタン押下時のイベントリスナ
    result_download.addEventListener('click', function() {
      //解答状況に合計点を追加
      answerStatus += "総合成績 ： " + score + ' / ' + quizSet.length;
      //解答状況をファイルに書き込みDLする関数を呼び出し
      setBlob('result_download', answerStatus);
    });
  }

  function checkAnswer(node) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    var dispNum = currentNum + 1;//解答結果出力用設問番号
    if (node.textContent === quizSet[currentNum].a[0]) {
      node.textContent += ' ... Correct!';
      node.classList.add('correct');
      score++;
      //該当問題の解答状況
      answerStatus += dispNum + " : 正解\n";
    } else {
      node.textContent += ' ... Wrong!';
      node.classList.add('wrong');
      //正解選択肢の表示。色のみ変更。
      var i;
      for (i = 0; i < answers.length; i++) {
        if (answers[i].textContent == quizSet[currentNum].a[0]) {
          answers[i].classList.add('correct');
        }
      }
      //該当問題の解答状況。不正解時は正解の提示も行う。
      answerStatus += dispNum + " : 残念。正解は「" + quizSet[currentNum].a[0] + "」\n";
    }
    btn.classList.remove('disabled');
    currentNum++;
  }
  //解答状況をファイルに書き込む。
  function setBlob(id, result_download) {
    var blob = new Blob([result_download], {'type': 'text/plain'});
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
