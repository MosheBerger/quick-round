import React, { useState } from 'react'
import TestGame from '../../games/TheGames/game 1 test/TestGame.jsx'
import TriviaGame from '../../games/TheGames/Trivia/Trivia.js'
import GameScreen from '../../games/GameScreen.jsx'

function SinglePlayer() {

  const [status, setStatus] = useState('playing')

  const settings2 = {
    question: 'when WarioWare, Inc.: Mega Microgame$! released',
    answerA: '2000',
    answerB: '2003',
    answerC: '2012',
    answerD: '1956',
    trueAnswer: 'answerB',
  }

  const settings = {
    question: 'למה ללמה קוראים למה?',
    answerA: 'למה לא?',
    answerB: 'למה כן?',
    answerC: 'ככה',
    answerD: 'מה זה בכלל',
    trueAnswer: 'answerA',
  }

  const playing = status === 'playing'
  // if (status === 'winner') { setStatus('playing2') }

  return (<div>

    {/* {status === 'playing1' &&
      <div className='middle'>
        <GameScreen funcGame={TriviaGame} settings={settings} setResult={setStatus} />
      </div>
    }
    {status === 'playing2' &&
      <div className='middle'>
        <GameScreen funcGame={TriviaGame} settings={settings2} setResult={setStatus} />
      </div>
    } */}
    {playing && <GameScreen funcGame={TestGame} setResult={setStatus} />}

    <h1 style={{ textAlign: 'center' }}>{status}</h1>
    <button onClick={() => setStatus('playing')}>reset</button>

  </div>)


}

export default SinglePlayer