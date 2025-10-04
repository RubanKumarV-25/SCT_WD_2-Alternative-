 const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";

// Update display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      updateDisplay("");
    } else if (value === "=") {
      try {
        if (currentInput.trim() === "") return;
        let result = eval(currentInput);
        if (!isFinite(result)) {
          updateDisplay("Error");
          currentInput = "";
          return;
        }
        currentInput = result.toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    currentInput += e.key;
    updateDisplay(currentInput);
  } else if (e.key === "Enter") {
    try {
      let result = eval(currentInput);
      if (!isFinite(result)) {
        updateDisplay("Error");
        currentInput = "";
        return;
      }
      currentInput = result.toString();
      updateDisplay(currentInput);
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (e.key.toLowerCase() === "c") {
    currentInput = "";
    updateDisplay("");
  }
});
