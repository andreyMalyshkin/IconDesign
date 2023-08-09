var acc = document.querySelector(".call-back__btn");
var list = document.querySelector(".call-back__list");

acc.addEventListener("click", function() {
  this.classList.toggle("active");

  if (list.style.display === "flex") {
    list.style.display = "none";
  } else {
    list.style.display = "flex";
  };
  if (list.style.maxHeight){
    list.style.maxHeight = null;
  } else {
    list.style.maxHeight = list.scrollHeight + "px";
  }
});

