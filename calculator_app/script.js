const buttons = document.querySelectorAll("button");
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const historyList = document.getElementById("history-list");

let currentInput = "";
let history = [];

// 🔥 Safe calculation (NO eval)
function calculate(expr) {
  try {
    let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|%)/g);
    let stack = [];
    let currentOp = "+";
    let num = 0;

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];

      if (!isNaN(token)) num = parseFloat(token);

      if (isNaN(token) || i === tokens.length - 1) {
        if (currentOp === "+") stack.push(num);
        if (currentOp === "-") stack.push(-num);
        if (currentOp === "*") stack.push(stack.pop() * num);
        if (currentOp === "/") stack.push(stack.pop() / num);
        if (currentOp === "%") stack.push(stack.pop() % num);

        currentOp = token;
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  } catch {
    return "Error";
  }
}

// 🔥 Update display + preview
function updateDisplay() {
  expressionEl.textContent = currentInput;

  try {
    const preview = calculate(currentInput);
    resultEl.textContent = preview;
  } catch {
    resultEl.textContent = "—";
  }
}

// 🔥 History
function addHistory(exp, result) {
  history.unshift({ exp, result });
  if (history.length > 5) history.pop();

  historyList.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.exp} = ${item.result}`;

    li.addEventListener("click", () => {
      currentInput = item.exp;
      updateDisplay();
    });

    historyList.appendChild(li);
  });
}

// 🔥 Button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "=") {
      const result = calculate(currentInput);
      addHistory(currentInput, result);
      currentInput = result.toString();
    } else if (value === "C") {
      currentInput = "";
    } else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
    } else {
      const operators = "+-*/%";
      const lastChar = currentInput.slice(-1);

      if (operators.includes(value) && operators.includes(lastChar)) return;

      currentInput += value;
    }

    updateDisplay();
  });
});

// 🔥 Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  document.querySelectorAll("button").forEach(btn => {
    if (btn.dataset.value === key) {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 100);
    }
  });

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    currentInput += key;
  } else if (key === "Enter") {
    const result = calculate(currentInput);
    addHistory(currentInput, result);
    currentInput = result.toString();
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key === "Escape") {
    currentInput = "";
  }

  updateDisplay();
});

// init
updateDisplay();