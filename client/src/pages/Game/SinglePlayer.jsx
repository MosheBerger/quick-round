
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fetcher from '../../hooks/useFetch';
import BASE_URL from '../../BASE URL';
import GameScreen from '../../games/code/GameScreen';
import calculateTimes from './calculateTime';


function SinglePlayer() {

  const { roomId, user } = useLocation().state
  const navigate = useNavigate()

  const url = `${BASE_URL}/api/rooms/${roomId}/rounds/`
  const [rounds, loading, setLoading] = fetcher.useStateAndEffect(url, [])
  console.log(rounds);
  console.log(loading);


  // מונע מהמשתמש לעזוב את העמוד 
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
    console.log('תוצאות', results);

    const finishTime = calculateTimes(results)

    try {
      setLoading(true)

      const url = `${BASE_URL}/api/rooms/${roomId}/finish-times/`
      const res = await fetch(url, {
        method: 'post',
        body: JSON.stringify({
          userId: user.id,
          finishTime
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })


      const userFinishTime = await res.json()
      console.log('🛜', userFinishTime);

      navigate(`/room/${roomId}/score-board`, {
        state: { user, results, userFinishTime}
      })
    } catch (error) {
      console.log('❌', error);

    } finally {
      setLoading(false)
    }
  }

  return (<>
    <div >

      {rounds.length === 0 ?

        <h2 aria-busy={loading}> כבר מתחילים... </h2>
        :
        <GameScreen rounds={rounds} sendResults={sendResult} />
      }

    </div >
  </>)


}

export default SinglePlayer