const choices = document.querySelectorAll(".choice")
const pDisplay = document.querySelector("#pDisplay")
const cDisplay = document.querySelector("#cDisplay")
const roundResult = document.querySelector("#lastRoundResult")
let pScore = 0;
let cScore = 0;

let playerInput, computerInput;

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

function guiPlay(input) {
    playerInput = input.target.id
    computerInput = computerPlay()
    let result = playRound(playerInput, computerInput)
    if (result == "win") {
        roundResult.textContent = `You win! ${playerInput} beats ${computerInput}.`
        pDisplay.textContent = ++pScore
    } else if (result == "lose") {
        roundResult.textContent = `You lose! ${computerInput} beats ${playerInput}.`
        cDisplay.textContent = ++cScore
    } else {
        roundResult.textContent = 'Round tie!'
    }

    if (pScore > 4) {
        roundResult.textContent = 'You won the game!'
        disableButtons()
    }
    if (cScore > 4) {
        roundResult.textContent = 'You lost this game!'
        disableButtons()
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



