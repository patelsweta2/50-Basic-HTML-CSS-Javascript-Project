const hourE1 = document.getElementById("hour");
const minE1 = document.getElementById("min");
const secE1 = document.getElementById("sec");
const ampmE1 = document.getElementById("ampm");

const updateClock = () => {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "AM";

  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  hourE1.innerText = h;
  minE1.innerText = m;
  secE1.innerText = s;
  ampmE1.innerText = ampm;

  setTimeout(() => {
    updateClock();
  }, 1000);
};

updateClock();
