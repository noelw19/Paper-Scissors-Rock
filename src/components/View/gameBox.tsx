import React, {FC, useState} from 'react';
import movesObj from '../Moves/moves';

import rock from '../../images/rock.png';
import paper from '../../images/paper.png';
import scissors from '../../images/scissors.png';
import './index.css';


let {PlayChoice, computerChoice, GameResult, checkIfWin} = movesObj;


function renderAnswerToEl(classname: string, ans: string): void {
  let computerChoiceEl = document.querySelector(classname) as HTMLElement;
  computerChoiceEl.style.backgroundImage = ans === 'Rock' ? `url(${rock})` : ans === 'Paper' ? `url(${paper})` : `url(${scissors})`
  computerChoiceEl.style.backgroundSize = 'contain';
}
 
function handleChoice(e: React.MouseEvent<HTMLButtonElement>): string {
  // checkIfWin()
  
  let compAns: string = computerChoice()
  renderAnswerToEl('.computerAnswer', compAns);

  let inner= e.target as HTMLInputElement;
  let userAns = inner.innerText;

  let result = checkIfWin(compAns === 'Paper' ? PlayChoice.paper : compAns === 'Rock' ? PlayChoice.rock : PlayChoice.scissors, userAns === 'Paper' ? PlayChoice.paper : userAns === 'Rock' ? PlayChoice.rock : PlayChoice.scissors)
  let outcome = GameResult[result]
  renderAnswerToEl('.userAnswer', userAns);

  console.log(`User chose ${userAns}, comp choice is ${compAns} \n Did you win? ${result} \n outcome = ${outcome}`);
  return outcome.toString();

}

function ComputerChoiceBox() {
  return (
    <div style={{marginBottom: '1rem'}}>
      <p>Computer</p>
      <div className='computerAnswer' style={{width: '100px', height: '100px', marginBottom: '1rem'}}></div>
    </div>
  )
}



function UserChoiceBox() {

  let [comCount, setCompCount] = useState(0);
  let [userCount, setUserCount] = useState(0);

  let resultBox = document.querySelector('.resultBox') as HTMLElement;
  let cover = document.querySelector('.cover') as HTMLElement;
  let playAgain = document.querySelector('.playAgain') as HTMLElement;






  let winHandler = () => {
    resultBox.style.display = 'flex';
    resultBox.textContent = 'YOU WIN!';
    cover.style.display = 'flex'
    playAgain.style.display = 'flex';
  }
  
  let loseHandler = () => {
    resultBox.style.display = 'flex';
    resultBox.textContent = 'YOU LOSE!';
    cover.style.display = 'flex'
    playAgain.style.display = 'flex';

  }
  
  let drawHandler = () => {
    
  }

  function handleChoice(e: React.MouseEvent<HTMLButtonElement>): void {
    // checkIfWin()
    let roundRes = document.querySelector('.roundRes') as HTMLElement;

    
    let compAns: string = computerChoice()
    renderAnswerToEl('.computerAnswer', compAns);
  
    let inner= e.target as HTMLInputElement;
    let userAns = inner.innerText;
  
    let result = checkIfWin(compAns === 'Paper' ? PlayChoice.paper : compAns === 'Rock' ? PlayChoice.rock : PlayChoice.scissors, userAns === 'Paper' ? PlayChoice.paper : userAns === 'Rock' ? PlayChoice.rock : PlayChoice.scissors)
    let outcome = GameResult[result]
    renderAnswerToEl('.userAnswer', userAns);
  
    console.log(`User chose ${userAns}, comp choice is ${compAns} \n Did you win? ${result} \n outcome = ${outcome}`);
    console.log(outcome === 'win', outcome === 'lose', outcome === 'draw')

    switch(outcome) {
      case 'win':
        setUserCount(userCount + 1);
        if(userCount > 8) {
          console.log('you winner')
          winHandler();
        }
        roundRes.textContent = "Round WIN";
        break;
      case 'lose':
        setCompCount(comCount + 1);
        if(comCount > 8) {
          console.log('you loser')
          loseHandler();
        }
        roundRes.textContent = "Round LOSE";
        break;
      case 'draw':
        roundRes.textContent = "Round DRAW";
        drawHandler();
        break;
    }
    
  }


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', zIndex: 1, borderTop: '3px solid black'}}>
      <p>User</p>
      <div className='userAnswer' style={{width: '100px', height: '100px'}}></div>
      <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
        <button className='choiceBtn' onClick={handleChoice}>{PlayChoice.paper}</button>
        <button className='choiceBtn' onClick={handleChoice}>{PlayChoice.rock}</button>
        <button className='choiceBtn' onClick={handleChoice}>{PlayChoice.scissors}</button>
      </div>
      <div className="scoreBoard" >
        <h4 style={{textAlign: 'center'}}>SCORE</h4>
          <p className='roundRes'>Result</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><p>User: </p> <p style={{textAlign: 'right'}}>{userCount}</p></div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><p>Computer: </p> <p style={{textAlign: 'right'}}>{comCount}</p></div>

        </div>
      <div className='cover' style={{display: 'none', fontSize: '2rem', width: '100vw', height: '100vh', padding: '1rem', background: 'white', opacity: '0.5', color: 'white', position: 'absolute', left: '0%', top: '0%', zIndex: 3, justifyContent: 'center'}}></div>
      <div className='resultBox' style={{display: 'none', fontSize: '2rem', width: '100%', flexDirection:'column', height: 'auto', padding: '1rem', background: 'var(--winnerBG)', color: 'white', position: 'absolute', top: '35%', left: '0%', zIndex: 5, justifyContent: 'center'}}></div>
      <button className='playAgain' onClick={() => {window.location.reload()}}>Play Again</button>
    </div>
  )
}

function GameBoxChild() {

 

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <ComputerChoiceBox/>
        <UserChoiceBox />
    </div>
  )
}

function GameBox() {
  return (
  <div className='gameParent' >
        <GameBoxChild />
    </div>
  )
}



export default GameBox;