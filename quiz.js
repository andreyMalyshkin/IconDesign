const quizData = [
  {
    question: "Какой стиль Вам ближе/необходим",
    a: "Неоклассика",
    b: "Модерн",
    c: "Экостиль",
    d: "Японский",
    e: "Арт Деко",
    f: "Минимализм",
  },
  {
    question: "Какая у Вас квадратура",
    a: "Неоклассика",
    b: "Модерн",
    c: "Экостиль",
    d: "Японский",
    e: "Арт Деко",
    f: "Минимализм",
  },
  {
    question: "Когда необходимо начать создание дизайн-проекта",
    a: "Как можно скорее",
    b: "В течение пару недель",
    c: "Не торопимся",
  },
]



const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const e_text = document.getElementById('e_text');
const f_text = document.getElementById('f_text');
const submit = document.getElementById('submit');
const input = document.getElementById('square');
const quizlist = document.getElementById('list');
const item4 = document.getElementById('item4');
const item5 = document.getElementById('item5');
const item6 = document.getElementById('item6');

let currentQuiz = 0;
const answers = [];

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  input.style.display = 'none';

  if (currentQuiz === 0) {
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    e_text.innerText = currentQuizData.e;
    f_text.innerText = currentQuizData.f;
  }

  if (currentQuiz === 1) {
    input.style.display = 'block';
    quizlist.style.display = 'none';

    let imgA = document.getElementById('img-a');
    let imgB = document.getElementById('img-b');
    let imgC = document.getElementById('img-c');
    imgA.style.display = 'none';
    imgB.style.display = 'none';
    imgC.style.display = 'none';
  }

  if (currentQuiz === 2) {
    quizlist.style.display = 'block';

    input.style.display = 'none';
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;


    item4.style.display = 'none';
    item5.style.display = 'none';
    item6.style.display = 'none';
  }

}

function deselectAnswers(){
  answerElements.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
  let answer;

  answerElements.forEach(answerEl => {
      if(answerEl.checked){
          answer = answerEl.id;
      }
  });

  return answer;
}

submit.addEventListener ('click',() => {
  if (currentQuiz != 1) {
    answers.push(getSelected());
  }else {
    answers.push(input.value);
    console.log(answers);
  }

  currentQuiz++;

  console.log(answers);

  if(currentQuiz < quizData.length){
    loadQuiz();
  }else {
    quiz.innerHTML = 'Мы уже  считаем стоимость проекта, чтобы мы смогли отправить расчет оставьте, пожалуйста, Ваши контакты!';
    let quizCallText = document.createElement('h2');
    quizCallText.textContent = 'Мы уже  считаем стоимость проекта, чтобы мы смогли отправить расчет оставьте, пожалуйста, Ваши контакты!';
    let quizCall = document.getElementById('quiz-call')
    quizCall.style.display = "block"
  }
})

document.addEventListener('DOMContentLoaded', function () {
  var labels = document.querySelectorAll('.label-wrap');

  labels.forEach(function (label) {
    var radioInput = label.querySelector('.answer');

    radioInput.addEventListener('change', function () {
      labels.forEach(function (label) {
        label.classList.remove('checked');
      });

      if (radioInput.checked) {
        label.classList.add('checked');
      }
    });
  });
});
