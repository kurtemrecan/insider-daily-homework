const inputDuration = document.getElementById('timeInput');
const countDisplay = document.getElementById('counterDisplay');

const startCountDown = (timeLeft) => {
  if (timeLeft < 0) {
    countDisplay.innerText = 'Geçerli bir süre giriniz!';
    return;
  }

  countDisplay.innerText = `${timeLeft} saniye kaldı!`;

  if (timeLeft > 0) {
    setTimeout(() => startCountDown(timeLeft - 1), 1000);
  } else {
    countDisplay.innerText = 'Süre doldu!';
  }
};
document.getElementById('start-btn').addEventListener('click', () => {
  startCountDown(inputDuration.value);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  countDisplay.innerText = 'Süre buraya gelecek..';
  inputDuration.value = '';
});
