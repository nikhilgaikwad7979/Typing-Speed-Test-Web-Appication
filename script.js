const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

const sampleText = `Typing speed is measured in words per minute or WPM. It shows how fast you can type.`;
let timer = 60;
let interval;
let started = false;

function startTest() {
  textDisplay.innerText = sampleText;
  textInput.value = "";
  textInput.disabled = false;
  timer = 60;
  timerElement.innerText = timer;
  wpmElement.innerText = "0";
  accuracyElement.innerText = "0%";
  clearInterval(interval);

  started = true;
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timer > 0) {
    timer--;
    timerElement.innerText = timer;
  } else {
    endTest();
  }
}
function endTest1(){
   endTest() ; 
}

function endTest() {
  clearInterval(interval);
  textInput.disabled = true;

  const typedText = textInput.value;
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / 60) * (60 - timer));
  const correctChars = countCorrectCharacters(sampleText, typedText);
  const accuracy = Math.round((correctChars / sampleText.length) * 100);

  wpmElement.innerText = wpm;
  accuracyElement.innerText = `${accuracy}%`;
}

function countCorrectCharacters(original, typed) {
  let count = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) {
      count++;
    }
  }
  return count;
}

textInput.addEventListener("input", () => {
  if (!started) {
    startTest();
  }
});
