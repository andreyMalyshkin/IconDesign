let callBackbtn = document.querySelector('.call-back__btn');
let callBackList = document.querySelector('.call-back__list');

callBackbtn.addEventListener('click', toggleAnimation);

function toggleAnimation() {
  callBackbtn.classList.toggle('stop-animation');

  if (callBackbtn.classList.contains('stop-animation')) {
    callBackList.style.maxHeight = '200px';
  } else {
    callBackList.style.maxHeight = '0';
  }
}
