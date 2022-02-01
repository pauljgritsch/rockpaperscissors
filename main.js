const lastroundresult = document.querySelector("#lastroundresult")

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

function game() {
    // intitialize variables to keep track of rounds
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let rounds = 0;

    while (rounds < 5) {
        let playerInput = prompt("Rock, Paper, or Scissors? ").toLowerCase()
        let computerInput = computerPlay()

        // input validation
        let badInput = true
        while (badInput){
            if ((playerInput == "rock") || (playerInput == "paper") || (playerInput == "scissors")){
                badInput = false
            } else {
                playerInput = prompt(`You must enter "rock", "paper", or "scissors".`).toLowerCase()
            }
        }

        let result = playRound(playerInput, computerInput)
        rounds += 1
        if (result == "win") {
            console.log(`You Win! ${playerInput} beats ${computerInput}.`)
            lastroundresult.innerHTML += `Round ${rounds} You Win! ${playerInput} beats ${computerInput}. <br>`
            wins += 1
        } else if (result == "lose") {
            console.log(`You Lose! ${computerInput} beats ${playerInput}.`)
            lastroundresult.innerHTML += `Round ${rounds} You Lose! ${computerInput} beats ${playerInput}. <br>`
            losses += 1
        } else {
            console.log(`Round was a Tie! Both inputs were ${playerInput}.`)
            lastroundresult.innerHTML += `Round ${rounds} was a Tie! Both inputs were ${playerInput}. <br>`
            ties += 1
        }
    }
    document.write(`Game Results: <br> Wins: ${wins} <br> Losses: ${losses} <br> Ties: ${ties} <br>`)
    if (wins == losses) {
        document.write(`Match was a tie!`)
    } else if (wins > losses) {
        document.write(`You won the match!`)
    } else {
        document.write(`You lost the match!`)
    }

}

game()



