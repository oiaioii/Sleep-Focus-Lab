let startTime, sleepHours;

document.getElementById('startBtn').onclick = () => {
sleepHours = parseFloat(document.getElementById('sleepInput').value);
if (isNaN(sleepHours)) {
alert("Please enter your sleep time.");
return;
}

const testBox = document.getElementById('testBox');
const result = document.getElementById('result');
const advice = document.getElementById('advice');

testBox.style.backgroundColor = "gray";
testBox.innerText = "Ready...";
result.innerText = "";
advice.innerText = "";

// 깜빡임 기능
const blinkCount = Math.floor(Math.random() * 3) + 2; // 2~4회
let blinkIndex = 0;

const blinkInterval = setInterval(() => {
testBox.style.backgroundColor =
testBox.style.backgroundColor === "gray" ? "yellow" : "pink";
blinkIndex++;
if (blinkIndex >= blinkCount * 2) {
clearInterval(blinkInterval);

 // 깜빡임 후, 랜덤 시간 대기 후 테스트 시작
  setTimeout(() => {
    testBox.style.backgroundColor = "green";
    testBox.innerText = "Click now!";
    startTime = Date.now();
  }, Math.random() * 3000 + 2000); // 2~5초 사이
}

}, 300); // 깜빡이는 간격 0.3초
};

document.getElementById('testBox').onclick = () => {
if (!startTime) return;

const reactionTime = Date.now() - startTime;
const result = document.getElementById('result');
const advice = document.getElementById('advice');

result.innerText = `You slept ${sleepHours} hours. Your reaction time: ${reactionTime} ms`;

if (sleepHours < 6) {
advice.innerText = "You need more sleep. Aim for at least 7~8 hours for better focus!";
}

sendToSheet(sleepHours, reactionTime);
startTime = null;
};

function sendToSheet(hours, rt) {
fetch("https://script.google.com/macros/s/AKfycbxuo77taGLtLGWDchcIWN7KrpZGSX5KI9vK3hR5kItnFpZeAwdMY1RtgDUsqi7iw6dQUg/exec", {
method: "POST",
mode: "no-cors",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ sleep: hours, reaction: rt })
});
}
