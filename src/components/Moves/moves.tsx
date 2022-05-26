
enum PlayChoice {
    rock = 'Rock',
    paper = 'Paper',
    scissors = 'Scissors'
}

enum GameResult {
    lose,
    win,
    draw
}

function checkIfWin(comp: PlayChoice, user: PlayChoice): GameResult {
    switch(user) {
        case PlayChoice.rock: 
            if(comp === PlayChoice.rock) {
                return GameResult.draw
            } else if(comp === PlayChoice.scissors) {
                return GameResult.win
            }
            break;
        case PlayChoice.paper: 
            if(comp === PlayChoice.paper) {
                return GameResult.draw
            } else if(comp === PlayChoice.rock) {
                return GameResult.win
            }
            break;
        case PlayChoice.scissors:
            if(comp === PlayChoice.scissors) {
                return GameResult.draw
            } else if(comp === PlayChoice.paper) {
                return GameResult.win
            }
            break;
        default: 
            return GameResult.lose
    }

    return GameResult.lose
}

function computerChoice(): PlayChoice {
    let ran: number = Math.floor(Math.random() * 3) + 1;
    let ans: string = '';

    console.log(ran)
    switch(ran) {
        case 1:
            ans = PlayChoice.paper;
            break;
        case 2: 
            ans = PlayChoice.rock;
            break;
        case 3: 
            ans = PlayChoice.scissors;
            break;
    }
    return ans === 'Paper' ? PlayChoice.paper : ans === 'Rock' ? PlayChoice.rock : PlayChoice.scissors;
}

let movesObj = {PlayChoice, GameResult, computerChoice, checkIfWin} 

export default movesObj;