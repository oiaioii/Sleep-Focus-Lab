let startTime, sleepHours;
let blinkInterval;

document.getElementById('startBtn').onclick = () => {
  sleepHours = parseFloat(document.getElementById('sleepInput').value);
  if (isNaN(sleepHours)) {
    alert("Please enter your sleep time.");
    return;
  }

  const testBox = document.getElementById('testBox');
  const result = document.getElementById('result');
  const advice = document.getElementById('advice');

  result.innerText = "";
  advice.innerText = "";
  testBox.innerText = "Ready...";

  const colors = ["gray", "yellow", "pink"];
  let colorIndex = 0;

  // 색상 순환 시작
  blinkInterval = setInterval(() => {
    testBox.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  }, 300); // 0.3초 간격으로 색상 변경

  // 일정 시간 기다린 뒤에 "Click now!" 표시
  const delay = Math.random() * 3000 + 2000; // 2~5초
  setTimeout(() => {
    clearInterval(blinkInterval);
    testBox.style.backgroundColor = "green";
    testBox.innerText = "Click now!";
    startTime = Date.now();
  }, delay);
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
