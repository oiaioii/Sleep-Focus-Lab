let startTime, sleepHours;
let blinkInterval; // 깜빡임 타이머를 외부에서 접근 가능하게

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

  // 깜빡임 무한 루프 시작
  blinkInterval = setInterval(() => {
    colorIndex = (colorIndex + 1) % colors.length;
    testBox.style.backgroundColor = colors[colorIndex];
  }, 300);

  // 일정 시간 후 반응 속도 테스트 시작
  const delay = Math.random() * 3000 + 2000; // 2~5초
  setTimeout(() => {
    clearInterval(blinkInterval); // 깜빡임 멈추기
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
    advice.innerText = "You need more sleep. Aim for at least 7–8 hours for better focus!";
  }

  sendToSheet(sleepHours, reactionTime);
  startTime = null;
};

function sendToSheet(hours, rt) {
  fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sleep: hours, reaction: rt })
  });
}
