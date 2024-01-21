import React from 'react'
import Avatar from '../../components/avatar/Avatar'
import GameCard from '../../components/GameCard'
import TimingCard from './TimingCard'

function ScoreTable({ room, title }) {

    const { players, finishTimes } = room

    console.log('group',Object.groupBy(finishTimes,ft => ft.user_id));
    const scores = []
    for (const player of players) {

        const time = finishTimes.reduce((prev, time) => {
            if (
                time.user_id === player.id &&
                Number(time.finish_time) <= Number(prev.finish_time)
            ) {
                return time
            }
            return prev
        },
            { user_id: player.id, finish_time:Number.MAX_SAFE_INTEGER }
        )
        time.player = player
        scores.push(time)
    }
    scores.sort((a, b) => a.finish_time - b.finish_time)


    console.log('scores:', scores)
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <figure className='unmargin'>
                <table className='unmargin'>
                    <thead>
                        <tr>
                            <th scope='col'> שחקן </th>
                            <th scope='col'> שם </th>
                            <th scope='col'> זמן סיום חדר  </th>
                        </tr>
                    </thead>
                    <tbody>

                        {scores.map((score) => {
                            const { player: p, id } = score

                            return <tr key={score.user_id}>
                                <td>
                                    <Avatar avatarSeed={p.avatar} />
                                </td>
                                <td> {p.name || 'null'} </td>
                                <td>{(score.finish_time / 1000).toFixed(2) + ' שניות'}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </figure>
        </article >

    </>)
}

export default ScoreTable