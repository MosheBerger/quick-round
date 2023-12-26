
import { useEffect, useState } from 'react';
import gameList from '../../games'
import { useLocation, useNavigate } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';


const INITIAL_RESULT = { success: false, finishTime: 0 }

function SinglePlayer() {

  const { roomId, user } = useLocation().state
  const navigate = useNavigate()

  const url = `${BASE_URL}/api/rounds/in-room/${roomId}`
  const [rounds, /* setRounds */] = fetcher.useStateAndEffect(url, [])


  const [result, setResult] = useState(INITIAL_RESULT)
  const [curRound, setCurRound] = useState(0)

  const sorted = rounds.sort((a, b) => a?.round_num - b?.round_num)
  const thisRound = sorted[curRound]


  // sendResult
  useEffect(() => {
    const sendResult = async () => {
      // console.log('result',result);
      try {
        const url = `${BASE_URL}/api/results/in-round/${sorted[curRound - 1].id}/user/${user.id}`
        const res = await fetch(url, {
          method: 'post',
          body: JSON.stringify({ ...result }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        console.log('🛜', data);

      } catch (error) {
        console.log('❌', error);

      } finally {
        if (!thisRound) {
          navigate(`/room/${roomId}/score-board`,{
            state:{user}
          })
        }
      }
    }

    if (result.finishTime !== 0) {
      console.log('sending');
      sendResult()
    }
  }, [curRound, navigate, result, roomId, sorted, thisRound, user])

  // useEffect(() => () => {
  // console.log('leave');
  // const url = `${BASE_URL}/api/rooms/${roomId}/leave/${user.id}`
  // fetcher.useNow(url)
  // TODO fix leaving the page cause leaving the room 
  // }, [])


  const moveToNextGame = () => {
    setCurRound(prev => prev + 1)
  }

  if (!thisRound){
    console.log('bye');
    return<></>
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