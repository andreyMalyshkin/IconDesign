



document.addEventListener('DOMContentLoaded', function () {
  const labels = document.querySelectorAll('.quiz-style');
  const labelLast = document.querySelectorAll('.quiz-time');
  const squareBtn = document.getElementById('square-btn');
  const quizScore = 0;

  function hidden() {
    // Прячем 3 заданеи
    labelLast.forEach(function (label) {
        let quizLastPart = document.getElementById('quizlast');
        quizLastPart.style.display = 'none';
    });
// Второе
    let sqare = document.querySelector('.quiz-sqare');
    sqare.style.display = 'none'
// Прячем форму

    let quizBackForm = document.querySelectorAll('.quiz-back-form');
    quizBackForm.forEach((label) => {
    label.style.display = 'none';
    })

    let btnSubQuiz = document.getElementById('quiz-btn');
    btnSubQuiz.style.display = 'none';

  }

  hidden();

  labels.forEach(function (label) {
    var radioInput = label.querySelector('.answer');

    radioInput.addEventListener('change', function () {
      labels.forEach(function (label) {
        label.classList.remove('checked');
        let quizFirstPart = document.getElementById('quizfirst');
        quizFirstPart.style.display = 'none';

      });

      if (radioInput.checked) {
        label.classList.add('checked');
        labelLast.forEach(function (label) {
          let sqare = document.querySelector('.quiz-sqare');
          sqare.style.display = 'block'
          document.getElementById('question').innerHTML = 'Какая у Вас квадратура?';
      });
      }

    });
  });

  labelLast.forEach(function (label) {
    var radioInputlast = label.querySelector('.lastAnswer');
    radioInputlast.addEventListener('change', function () {
      labelLast.forEach(function (label) {
        label.classList.remove('checked');
        let quizLastPart = document.getElementById('quizlast');
        quizLastPart.style.display = 'none';
      });

      if (radioInputlast.checked) {
        document.getElementById('question').innerHTML = 'Когда необходимо начать создание дизайн-проекта?';
        label.classList.add('checked');
        let quizBackForm = document.querySelectorAll('.quiz-back-form');
        quizBackForm.forEach((label) => {
        label.style.display = 'block';
        })

        let btnSubQuiz = document.getElementById('quiz-btn');
        btnSubQuiz.style.display = 'block';
        document.getElementById('question').style.display = 'none';

        let massage = document.createElement('h3');
        massage.classList.add('section-title');
        massage.classList.add('quiz__title');
        massage.innerHTML = 'Отлично. Последний шаг!';
        document.getElementById('quiz-call').prepend(massage);
      }
    });
  });

  squareBtn.addEventListener('click',() => {
    labelLast.forEach(function (label) {
      let quizLastPart = document.getElementById('quizlast');
      quizLastPart.style.display = 'block';
      document.getElementById('question').innerHTML = 'Когда Вам нужен проект';
  });
  let sqare = document.querySelector('.quiz-sqare');
  sqare.style.display = 'none'
  })

});
