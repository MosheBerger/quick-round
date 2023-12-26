
import { useEffect, useState } from 'react';
import gameList from '../../games'
import { useLocation } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';


const INITIAL_RESULT = { success: false, finishTime: 0 }

function SinglePlayer() {

  const { roomId, user } = useLocation().state

  const url = `${BASE_URL}/api/rounds/in-room/${roomId}`
  const [rounds, /* setRounds */] = fetcher.useStateAndEffect(url, [])

  const [result, setResult] = useState(INITIAL_RESULT)
  const [curRound, setCurRound] = useState(0)

  // sendResult
  useEffect(() => {
    const sendResult = async () => {
      // console.log('result',result);
      try {
        const url = `${BASE_URL}/api/results/in-round/${roomId}/user/${user.id}`
        const res = await fetch(url, {
          method: 'post',
          body: JSON.stringify({ result }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        console.log('🛜',data);

      } catch (error) {
        console.log('❌',error);
      }
    }

    if (result.finishTime !== 0) {
      console.log('sending');
      sendResult()
    }
  }, [result, roomId, user])

  // useEffect(() => () => {
  // console.log('leave');
  // const url = `${BASE_URL}/api/rooms/${roomId}/leave/${user.id}`
  // fetcher.useNow(url)
  // TODO fix leaving the page cause leaving the room 
  // }, [])

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
    <div>
      {/* <button onClick={moveToNextGame}>change game</button> */}
      <h4 style={{ textAlign: "center" }}> סבב מספר {thisRound?.round_num}</h4>

      {playing &&
        <Game key={curRound} settings={thisRound?.settings} setResult={setResult} moveToNextGame={moveToNextGame} />
      }

      <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.finishTime}</p>

    </div >
  </>)


}

export default SinglePlayer