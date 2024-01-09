
import { useEffect, useState } from 'react';
// import gameList from '../../games'
import { useLocation, useNavigate } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';
import GameScreen from '../../games/code/GameScreen';


function SinglePlayer() {

  const { roomId, user } = useLocation().state
  // todo const navigate = useNavigate()

  const url = `${BASE_URL}/api/rounds/in-room/${roomId}`
  const [rounds] = fetcher.useStateAndEffect(url, [])
  console.log(rounds);


  //! מונע מהמשתמש לעזוב את העמוד 
  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "הנתונים לא יישמרו. לצאת?";
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  // !sendResult
  // useEffect(() => {
  //   const sendResult = async () => {
  //     // console.log('result',result);
  //     try {
  //       //   const url = `${BASE_URL}/api/results/in-round/${sorted[curRound - 1].id}/user/${user.id}`
  //       //   const res = await fetch(url, {
  //       //     method: 'post',
  //       //     body: JSON.stringify({ ...result }),
  //       //     headers: {
  //       //       "Content-Type": "application/json"
  //       //     }
  //       //   })
  //       //   const data = await res.json()
  //       const data = result
  //       console.log('🛜', data);

  //     } catch (error) {
  //       console.log('❌', error);

  //     } finally {
  //       // if (!thisRound) {
  //       //   navigate(`/room/${roomId}/score-board`, {
  //       //     state: { user }
  //       //   })
  //       // }
  //     }
  //   }

  //   if (result.length === rounds.length) {
  //     console.log('sending');
  //     sendResult()
  //   }
  // }, [curRound, navigate, result, roomId, sorted, thisRound, user, rounds])




  return (<>
    <div>
      {rounds.length > 0 &&
        <GameScreen rounds={rounds} />
      }

      {/* <progress value={curRound + 1} max={rounds.length + 1}></progress> */}


      {/* <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.finishTime}</p> */}

    </div >
  </>)


}

export default SinglePlayer