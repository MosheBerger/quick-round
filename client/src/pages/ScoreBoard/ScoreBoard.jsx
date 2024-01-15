import React, { Fragment, useMemo } from 'react'
import fetcher from '../../hooks/useFetch'
import BASE_URL from '../../BASE URL';
import { Link, useLocation, useParams } from 'react-router-dom';
import Avatar from '../../components/avatar/Avatar';
import ScoreTable from './ScoreTable';

function ScoreBoard() {
    const user = useLocation().state

    const roomId = parseInt(useParams('roomId').roomId)

    const url = `${BASE_URL}/api/score-board/room/${roomId}`
    const [room] = fetcher.useStateAndEffect(url)

    console.log(room);

    // first attempt for each player // TODO make it for each round

    useMemo(() => {

        if (room) {
            room.firstResultsTable = []
            room.lastResultsTable = []
            const { rounds, players } = room
            rounds.forEach((round) => {
                const resultsByUser = Object.groupBy(round.results, ({ user_id }) => user_id)
                const firstRoundArr = []
                const lastRoundArr = []
                players.forEach((user) => {
                    firstRoundArr.push(resultsByUser[user.id]?.reduce((p, v) => p.id < v.id ? p : v))
                    lastRoundArr.push(resultsByUser[user.id]?.reduce((p, v) => p.id > v.id ? p : v))
                })
                room.firstResultsTable.push(firstRoundArr)
                room.lastResultsTable.push(lastRoundArr)
            })
            console.log('first', room.firstResultsTable);
            console.log('last', room.lastResultsTable);
        }
    }, [room])
    // const resultByUser = room && Object.groupBy(room.rounds[0].results, ({ user_id }) => user_id)
    // if (room) room.players.forEach((user) => console.log('user', user.id, resultByUser[user.id]?.reduce((p, v) => p.id < v.id ? p : v)))

    const BackToLobby = <Link to={'/lobby#join'} state={user} ><button> בחזרה ללובי </button></Link>


    return (<div >

        <h1>לוח ניקוד</h1>

        {/*//todo {BackToLobby} */}
        {!room ?
            <div aria-busy="true">טוען</div>

            : <>
                <div className='flex'>
                    <h2>{room.name}</h2>
                    <h4> מנהל: {room.manager.name} </h4>
                </div>
                {/* 
                <h4 style={{ marginBottom: 0 }}> שחקנים </h4>
                <figure>
                    <div id='players' className='middle'>
                        {room.players.map((p) =>
                            <article className='unmargin' key={p.id} >

                                <h5>{p.name}</h5>
                                <Avatar avatarSeed={p.avatar} />

                            </article>
                        )}
                    </div>
                </figure> */}

                <ScoreTable
                    room={room}
                    tableKey={'firstResultsTable'}
                    title={'ניקוד על הפעם הראשונה'}
                />
                <br />
                <ScoreTable
                    room={room}
                    tableKey={'lastResultsTable'}
                    title={'ניקוד בפעם האחרונה ששחקת'}
                />
                <br />
                <br />
                {BackToLobby}
            </>
        }

    </div >)
}

export default ScoreBoard