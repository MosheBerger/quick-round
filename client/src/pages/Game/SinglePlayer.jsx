
import { useEffect, useState } from 'react';
// import gameList from '../../games'
import { useLocation, useNavigate } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';
import GameScreen from '../../games/code/GameScreen';


function SinglePlayer() {

  const { roomId, user } = useLocation().state
  const navigate = useNavigate()

  const url = `${BASE_URL}/api/rounds/in-room/${roomId}`
  const [rounds, loading, setLoading] = fetcher.useStateAndEffect(url, [])
  console.log(rounds);
  console.log(loading);


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
  const sendResult = async (results) => {
    console.log('resultim', results);
    try {
      setLoading(true)

      const url = `${BASE_URL}/api/results/in-room/${roomId}/user/${user.id}`
      const res = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ results }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      console.log('🛜', data);

      navigate(`/room/${roomId}/score-board`, {
        state: { user }
      })
    } catch (error) {
      console.log('❌', error);

    } finally {

    }
  }

  return (<>
    <div>
      {!loading &&
        <GameScreen rounds={rounds} sendResults={sendResult} />
      }

      {/* <progress value={curRound + 1} max={rounds.length + 1}></progress> */}


      {/* <span>success: {result.success ? 'true' : 'false'}</span>
      <p>time: {result.finishTime}</p> */}

    </div >
  </>)


}

export default SinglePlayer