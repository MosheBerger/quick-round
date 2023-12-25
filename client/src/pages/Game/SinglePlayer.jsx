
import { useState } from 'react';
import gameList from '../../games'
import GameScreen from '../../games/code/GameScreen.jsx'
import { useParams } from 'react-router-dom'
import Trivia from '../../games/TheGames/Trivia/Trivia';

const triviaSettings ={
  question: 'when WarioWare, Inc.: Mega Microgame$! released',
  answerA: '2000',
  answerB: '2003',
  answerC: '2012',
  answerD: '1956',
  trueAnswer: 'answerB',
}

const INITIAL_RESULT={ success: false, time: 0 }
function SinglePlayer() {

  const state = useParams()
  console.log(state);

  const [result, setResult] = useState(INITIAL_RESULT)
  const [game, setGame] = useState(2)

  const handle = () => {
    setResult(INITIAL_RESULT)
    if (game === 2) {
      setGame(prev => prev - 1)
    } else {

      setGame(prev => prev + 1)
    }
  }

  const Game = gameList[game]

  return (<div  /* className='middle' */ >
    <button onClick={handle}>change game</button>

    {/* {result.time === 0 && <> */}
      {/* <GameScreen funcGame={gameList[game]} setResult={setResult} settings={triviaSettings} /> */}
    {/* </>}   */}

  {/* <Trivia settings={triviaSettings}  setResult={setResult} /> */}
  <Game settings={triviaSettings}  setResult={setResult} />
    
    <span>success: {result.success ? 'true': 'false'}</span>
    <p>time: {result.time}</p>

  </div >)


}

export default SinglePlayer