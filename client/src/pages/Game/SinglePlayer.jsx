
import { useState } from 'react';
import gameList from '../../games'
// import { useParams } from 'react-router-dom'

const triviaSettings = {
  question: 'when WarioWare, Inc.: Mega Microgame$! released',
  answerA: '2000',
  answerB: '2003',
  answerC: '2012',
  answerD: '1956',
  trueAnswer: 'answerB',
}

const rounds = [1, 2, 2, 1]

const INITIAL_RESULT = { success: false, time: 0 }
function SinglePlayer() {

  // const state = useParams()
  // console.log(state);

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

  return (<>
    <div  /* className='middle' */ >
      <button onClick={moveToNextGame}>change game</button>

      <Game key={curRound} settings={triviaSettings} setResult={setResult} moveToNextGame={moveToNextGame} />

      <h4>round {curRound}</h4>
      <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.time}</p>

    </div >
  </>)


}

export default SinglePlayer