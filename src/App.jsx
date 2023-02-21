import { useEffect, useState } from 'react';
import './style.scss';

const winnerComb = [
  //horizontal
  {indexes: [0,1,2], orientation: 'horizontal' },
  {indexes: [3,4,5], orientation: 'horizontal'},
  {indexes: [6,7,8], orientation: 'horizontal'},

  //vertical 
  {indexes: [0,3,6], orientation: 'vertical'},
  {indexes: [1,4,7], orientation: 'vertical'},
  {indexes: [2,5,8], orientation: 'vertical'},

  //diagonal
  {indexes: [0,4,8], orientation: 'diagonal1'},
  {indexes: [2,4,6], orientation: 'diagonal2'},
]

function App() {
  const [gameData, setGameData] = useState([0,0,0,0,0,0,0,0,0]);
  const [turn, setTurn] = useState(1);  
  const [playerWinComb, setPlayerWinComb] = useState(null);

  const handleClick = (clickIndex) => {  
    if(gameData[clickIndex] !== 0){
      return
    }
    if(playerWinComb){
      return;
    }
    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickIndex] = turn;
      return newGameData;

    })

    setTurn((prev) => (prev === 1 ? 2 : 1));    
  }

  const checkingWinner = () => {  
    let winner = null;

    for(let combination of winnerComb){
      const {indexes} = combination;
      if(
        gameData[indexes[0]] === 1
        && gameData[indexes[1]] === 1
        && gameData[indexes[2]] === 1
      ){
        winner = 'player 1';
      }
      if(
        gameData[indexes[0]] === 2
        && gameData[indexes[1]] === 2
        && gameData[indexes[2]] === 2
      ){
        winner = 'player 2';
      }

      if(winner){
        setPlayerWinComb(combination);
        break;
      }
    }
  }

  useEffect(() => {
    checkingWinner();
    checkGameEnded();
  }, [gameData]);

  useEffect(() => {
    if(playerWinComb){
      alert('vencedor');
    }
  },[playerWinComb]);
  
  const checkGameEnded = () => {
    if(gameData.every((item) => item !== 0)){
      alert('deu velha');
    }
  }

  return (
    <>
      <h1>Jogo da Velha</h1>
      <div className="boardGame">
        {gameData.map((value, index) => (
          <span onClick={() => {handleClick(index)}} 
                key={index} 
                className={playerWinComb?.indexes.includes(index) ? playerWinComb.orientation : undefined}>
            <abbr title="">{index}</abbr>
            {value === 1 && '❌'}
            {value === 2 && '⭕️'}
          </span>
        ))}
        
      </div>
    </>
  );
}

export default App;
