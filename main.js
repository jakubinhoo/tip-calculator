//1. Check if num of people equals 0 before every calculation
//

class Calculator {
  constructor(tipAmountTextElement, totalTextElement) {
    this.tipAmountTextElement = tipAmountTextElement
    this.totalTextElement = totalTextElement
  }

  toggleWarning() {
    zeroWarning.classList.toggle("zero")
    numOfPeopleInput.classList.toggle("zero")
  }

  unclickButtons() {
    multiplierButtons.forEach((button) => {
      button.classList.remove("clicked")
    })
  }

  clickButton(button) {
    if (customMultiplierInput.value != "") return
    this.unclickButtons()

    button.classList.toggle("clicked")
  }

  numOfPeopleIsZero() {
    if (
      parseFloat(numOfPeopleInput.value) <= 0 ||
      (numOfPeopleInput.value === "" && !this.isWarned)
    ) {
      this.toggleWarning()
      this.isWarned = true
    } else if (
      parseFloat(numOfPeopleInput.value) > 0 &&
      this.isWarned === true
    ) {
      this.toggleWarning()
      this.isWarned = false
    }
  }

  run() {
    calculator.numOfPeopleIsZero()
    calculator.multiplyAmount()
    calculator.updateDisplay()
  }

  reset() {
    this.tipAmountValue = 0
    this.totalValue = 0
    this.updateDisplay()
  }

  resetButton() {
    this.unclickButtons()
    billInput.value = 0
    numOfPeopleInput.value = 0
    customMultiplierInput.value = 0
    this.reset()
  }

  multiplyAmount(button) {
    if (this.isWarned === true) {
      this.reset()
      return
    }

    this.value = parseFloat(billInput.value)

    if (customMultiplierInput.value === "") {
      this.multiplier = tipMultiplier.get(button.innerHTML)
    } else {
      this.multiplier = parseFloat(customMultiplierInput.value) / 100 + 1
    }

    this.tipAmountValue = this.value * (this.multiplier - 1)
    this.totalValue = this.value * this.multiplier
  }

  updateDisplay() {
    this.tipPerPerson = (
      this.tipAmountValue / parseFloat(numOfPeopleInput.value)
    ).toFixed(2)
    this.totalPerPerson = (
      this.totalValue / parseFloat(numOfPeopleInput.value)
    ).toFixed(2)
    tipAmountTextElement.innerHTML = `${this.tipPerPerson}`
    totalTextElement.innerHTML = `${this.totalPerPerson}`
  }
}

const tipAmountTextElement = document.querySelector("[data-tip-amount-display]")
const totalTextElement = document.querySelector("[data-total-display]")
const billInput = document.querySelector("[data-bill-input]")
const numOfPeopleInput = document.querySelector("[data-num-of-people-input]")
const multiplierButtons = document.querySelectorAll("[data-multiplier]")
const customMultiplierInput = document.querySelector("[data-custom-multiplier]")
const zeroWarning = document.querySelector("[data-zero-warning]")
const resetButton = document.querySelector("[data-reset-button]")

const tipMultiplier = new Map([
  ["5%", 1.05],
  ["10%", 1.1],
  ["15%", 1.15],
  ["25%", 1.25],
  ["50%", 1.5],
])

const calculator = new Calculator(tipAmountTextElement, totalTextElement)

multiplierButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.numOfPeopleIsZero()
    calculator.multiplyAmount(button)
    calculator.updateDisplay()
    calculator.clickButton(button)
  })
})

billInput.addEventListener("change", () => {
  calculator.run()
})

customMultiplierInput.addEventListener("change", () => {
  calculator.unclickButtons()
  calculator.run()
})

numOfPeopleInput.addEventListener("change", () => {
  calculator.run()
})

resetButton.addEventListener("click", () => {
  calculator.resetButton()
})
