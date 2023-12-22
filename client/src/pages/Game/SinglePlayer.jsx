// import React, { useState } from 'react'
// import TestGame from '../../games/TheGames/game 1 test/TestGame.jsx'
// import TriviaGame from '../../games/TheGames/Trivia/Trivia.js'
import gameList from '../../games'
import GameScreen from '../../games/GameScreen.jsx'
// import useFetch from '../../hooks/useFetch.jsx'
import { useParams } from 'react-router-dom'

function SinglePlayer() {

const state = useParams()
console.log(state);

  
  // const [rounds, setRounds] = useState([])
  // useFetch('',setRounds)
  // const [status, setStatus] = useState('playing')



  // const playing = status === 'playing'
  // if (status === 'winner') { setStatus('playing2') }

  return (<div  /* className='middle' */ >

    {/* <div>
      <GameScreen funcGame={gameList[1]}/>
    </div> */}
    <div>
      <GameScreen funcGame={gameList[2]} promise={new Promise((res)=>{setTimeout(res,0)})}/>
    </div>
    {/* <div>
      <GameScreen funcGame={gameList[2]} promise={new Promise((res)=>{setTimeout(res,4000)})}/>
    </div>
    <div>
      <GameScreen funcGame={gameList[2]} promise={new Promise((res)=>{setTimeout(res,6000)})}/>
    </div>
    <div>
      <GameScreen funcGame={gameList[2]} promise={new Promise((res)=>{setTimeout(res,8000)})}/>
    </div>
    <div>
      <GameScreen funcGame={gameList[2]} promise={new Promise((res)=>{setTimeout(res,10000)})}/>
    </div> */}
    {/* <div>
      <GameScreen funcGame={gameList[1]}/>
    </div> */}

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
    {/* {playing && <GameScreen funcGame={TestGame} setResult={setStatus} />} */}

    {/* <h1 style={{ textAlign: 'center' }}>{status}</h1>
    <button onClick={() => setStatus('playing')}>reset</button> */}

  </div>)


}

export default SinglePlayer