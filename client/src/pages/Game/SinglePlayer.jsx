
import { useState } from 'react';
import gameList from '../../games'
import { useLocation } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';


const INITIAL_RESULT = { success: false, time: 0 }

function SinglePlayer() {

  const { roomId, /* user */ } = useLocation().state

  const url = `${BASE_URL}/api/rounds/in-room/${roomId}`
  const [rounds, ] = fetcher.useStateAndEffect(url, [])

  // console.log(rounds);

  const [result, setResult] = useState(INITIAL_RESULT)
  const [curRound, setCurRound] = useState(0)

  const sorted = rounds.sort((a, b) => a?.round_num - b?.round_num)
  const thisRound = sorted[curRound]

  const moveToNextGame = () => {

    if (curRound + 1 !== rounds.length) {
      setCurRound(prev => prev + 1)

    } else {
      setCurRound(0)
    }
  }


  const Game = gameList[thisRound?.game_id]
  const playing = rounds.length > 0

  return (<>
    <div  /* className='middle' */ >
      {/* <button onClick={moveToNextGame}>change game</button> */}
      <h4 style={{textAlign:"center"}}> סבב מספר {thisRound?.round_num}</h4>

      {playing &&
        <Game key={curRound} settings={thisRound?.settings} setResult={setResult} moveToNextGame={moveToNextGame} />
      }

      <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.time}</p>

    </div >
  </>)


}

export default SinglePlayer