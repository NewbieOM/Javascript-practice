const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const addBtn = document.querySelector("#add");
const result = document.querySelector("#result");

addBtn.addEventListener("click", () => {
    const a = Number(num1.value);
    const b = Number(num2.value);

    const sum = a + b;

    result.textContent = `Result: ${sum}`;
});