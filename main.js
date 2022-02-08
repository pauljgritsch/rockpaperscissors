const choices = document.querySelectorAll(".choice")
const pDisplay = document.querySelector("#pDisplay")
const cDisplay = document.querySelector("#cDisplay")
const roundResult = document.querySelector("#lastRoundResult")
let pScore = 0;
let cScore = 0;
const modal = document.querySelector(".modal")

let playerInput, computerInput;

//adds capitalize method to string
Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });

// function to choose random input for computer
function computerPlay() {
    let choices = ["rock", "paper", "scissors"]
    let choice = choices[Math.floor(Math.random()*choices.length)]
    return choice
}

// play a round of rock paper scissors
function playRound(playerInput, computerInput) {
    // make playerInput case insensitive
    playerInput = playerInput.toLowerCase()
    // input validation
    const validInputs = ["rock", "paper", "scissors"]
    if ((!validInputs.includes(playerInput)) ||
    (!validInputs.includes(computerInput))) {
        throw "Input not valid!"
    }
    // check winner
    // winning conditions
    if ((playerInput == "rock" && computerInput == "scissors") ||
    (playerInput == "paper" && computerInput == "rock") ||
    (playerInput == "scissors" && computerInput == "paper")
    ) {
        return "win"
    }
    // tie condition
    else if (playerInput == computerInput) {
        return "tie"
    }
    // not win or tie means a loss
    else {
        return "lose"
    }
}

function disableButtons() {
    choices.forEach((choice) => choice.disabled = true)
}

function enableButtons() {
    choices.forEach((choice) => choice.disabled = false)
}

function colorChoices() {
    choices.forEach(c => c.style.backgroundColor = "grey")
    if (playerInput == computerInput) {
        document.getElementById(`${playerInput}`).style.backgroundColor = "purple"
    } else {
        document.getElementById(`${playerInput}`).style.backgroundColor = "green"
        document.getElementById(`${computerInput}`).style.backgroundColor = "red"
    }
}

function resetChoices() {
    choices.forEach(c => c.style.backgroundColor = "gray")
}

function guiPlay(input) {
    playerInput = input.target.id
    computerInput = computerPlay()
    let result = playRound(playerInput, computerInput)
    if (result == "win") {
        roundResult.textContent = `You win! ${playerInput.capitalize()} beats ${computerInput}.`
        pDisplay.textContent = ++pScore
    } else if (result == "lose") {
        roundResult.textContent = `You lose! ${computerInput.capitalize()} beats ${playerInput}.`
        cDisplay.textContent = ++cScore
    } else {
        roundResult.textContent = 'Round tie!'
    }
    colorChoices()

    if (pScore > 4) {
        roundResult.textContent = 'You won the game!'
        disableButtons()
        resetChoices()
    }
    if (cScore > 4) {
        roundResult.textContent = 'You lost this game!'
        disableButtons()
        resetChoices()
    }
    
}



const resetGame = () => {
    pScore = 0
    cScore = 0
    pDisplay.textContent = 0
    cDisplay.textContent = 0
    roundResult.innerHTML = "<br>"
    enableButtons()
}

choices.forEach((choice) => {
    choice.addEventListener("click", guiPlay)
})

document.querySelector("#reset").addEventListener("click", resetGame)



