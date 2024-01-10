import React, { Fragment } from 'react'
import fetcher from '../../hooks/useFetch'
import BASE_URL from '../../BASE URL';
import { Link, useLocation, useParams } from 'react-router-dom';
import Avatar from '../../components/avatar/Avatar';
import GameCard from '../../components/GameCard';

function ScoreBoard() {
    const user = useLocation().state

    const roomId = parseInt(useParams('roomId').roomId)

    const url = `${BASE_URL}/api/score-board/room/${roomId}`
    const [room] = fetcher.useStateAndEffect(url)

    console.log(room);
    console.log(room && Object.groupBy(room.rounds[0].results, ({user_id}) => user_id));
    
    const BackToLobby = <Link to={'/lobby#join'} state={user} ><button> בחזרה ללובי </button></Link>


    return (<div >

        <h1>לוח ניקוד</h1>

        {BackToLobby}
        {!room ?
            <div aria-busy="true">טוען</div>

            : <>
                <h2>{room.name}</h2>
                <h4> מנהל: {room.manager.username} </h4>

                <h4 style={{ marginBottom: 0 }}> שחקנים </h4>
                <div id='players' className='middle'>
                    {room.players.map((p) =>
                        <article key={p.id}>

                            <h5>{p.username}</h5>
                            <Avatar avatarSeed={p.avatar} />

                        </article>
                    )}
                </div>

                <article id='rounds'>
                    {room.rounds.map((r) => <Fragment key={r.id}>

                        <h5> סבב {r.round_num} </h5>
                        {/* <p> קוד משחק {r.game_id} </p> */}
                        <GameCard id={r.game_id} />

                        {r.results.map((res) => <div key={res.id}>
                            <span> קוד שחקן {res.user_id}</span>
                            --
                            <span> {res.success ? 'הצליח' : 'נכשל'}</span>
                            --
                            <span> זמן {res.finish_time}</span>
                        </div>)}
                    </Fragment>)}
                </article>


                {BackToLobby}
            </>
        }

    </div>)
}

export default ScoreBoard