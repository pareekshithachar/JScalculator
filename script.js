class Calculator {
  constructor(currtextelement, prevtextelement) {
    this.prevtextelement = prevtextelement;
    this.currtextelement = currtextelement;
    this.clear();
  }
  clear() {
    this.currtext = "";
    this.prevtext = "";
    this.operation = undefined;
  }
  delete() {
    this.currtext = this.currtext.toString().slice(0, -1);
  }
  append(number) {
    if (this.flag === 1) {
      this.flag = 0;
      this.currtext = "";
    }
    if (number === "." && this.currtext.includes(".")) return;
    this.currtext = this.currtext.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currtext === "") return;
    if (this.prevtext != "") {
      this.compute();
    }
    this.operation = operation;
    this.prevtext = this.currtext;
    this.currtext = "";
  }
  commaDisplay(num) {
    const stringnum = num.toString();
    const intd = parseFloat(stringnum.split(".")[0]);
    const decd = stringnum.split(".")[1];
    let disp;
    if (isNaN(intd)) {
      disp = "";
    } else {
      disp = intd.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decd != null) {
      return `${disp}.${decd}`;
    } else {
      return disp;
    }
  }
  compute() {
    let ans;
    const curr = parseFloat(this.currtext);
    const prev = parseFloat(this.prevtext);
    if (isNaN(curr) || isNaN(prev)) return;
    if (this.operation == "+") {
      ans = curr + prev;
    } else if (this.operation == "-") {
      ans = -curr + prev;
      console.log(curr, " ", prev, " ");
    } else if (this.operation == "÷") {
      ans = prev / curr;
    } else if (this.operation == "*") {
      ans = curr * prev;
    } else return;
    console.log(ans);
    this.currtext = ans;
    this.prevtext = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.currtextelement.innerText = this.commaDisplay(this.currtext);
    if (this.operation != null) {
      this.prevtextelement.innerText = `${this.commaDisplay(this.prevtext)} ${
        this.operation
      }`;
    } else {
      this.prevtextelement.innerText = "";
    }
  }
}

const numButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-operation]");
const eqButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-del]");
const acButton = document.querySelector("[data-ac]");
const currtextelement = document.querySelector("[data-curr-operand]");
const prevtextelement = document.querySelector("[data-prev-operand]");

const calculator = new Calculator(currtextelement, prevtextelement);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.updateDisplay();
  });
});

opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (calculator.currtext != "") {
      calculator.chooseOperation(button.innerText);
    } else {
      calculator.operation = button.innerText;
    }
    calculator.updateDisplay();
  });
});
eqButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.flag = 1;
});
acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
