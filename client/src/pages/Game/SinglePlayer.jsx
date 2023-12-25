
import { useState } from 'react';
import gameList from '../../games'
import { useLocation } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';

const triviaSettings = {
  question: 'when WarioWare, Inc.: Mega Microgame$! released',
  answerA: '2000',
  answerB: '2003',
  answerC: '2012',
  answerD: '1956',
  trueAnswer: 'answerB',
}


const INITIAL_RESULT = { success: false, time: 0 }

function SinglePlayer() {

  const { roomId, user } = useLocation().state

  const url = `${BASE_URL}/rounds/in-room/${roomId}`
  const [rounds, setRounds] = fetcher.useStateAndEffect(url, [])

  console.log(rounds);

  const [result, setResult] = useState(INITIAL_RESULT)
  const [curRound, setCurRound] = useState(0)



  const moveToNextGame = () => {

    if (curRound + 1 !== rounds.length) {
      setCurRound(prev => prev + 1)

    } else {
      setCurRound(0)
    }
  }


  const Game = gameList[rounds[curRound]]
  const playing = rounds.length > 0

  return (<>
    <div  /* className='middle' */ >
      <button onClick={moveToNextGame}>change game</button>

      {playing &&
        <Game key={curRound} settings={triviaSettings} setResult={setResult} moveToNextGame={moveToNextGame} />
      }

      <h4>round {curRound}</h4>
      <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.time}</p>

    </div >
  </>)


}

export default SinglePlayer