let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameOver = false;

const guessInput = document.querySelector("#guess");
const checkBtn = document.querySelector("#check");
const restartBtn = document.querySelector("#restart");
const message = document.querySelector("#message");
const attemptsDisplay = document.querySelector("#attempts");

checkBtn.addEventListener("click", () => {
    if (gameOver) return;

    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Enter a number between 1 and 100!";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === targetNumber) {
        message.textContent = `Correct! You won in ${attempts} attempts! 🎉`;
        gameOver = true;
    } else if (guess < targetNumber) {
        message.textContent = "Too low! Try a higher number.";
    } else {
        message.textContent = "Too high! Try a lower number.";
    }

    guessInput.value = "";
    guessInput.focus();
});

restartBtn.addEventListener("click", () => {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    attemptsDisplay.textContent = "0";
    message.textContent = "Let's play!";
    guessInput.value = "";
    guessInput.focus();
});