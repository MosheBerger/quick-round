import React from 'react'
import Avatar from '../../components/avatar/Avatar'

function ScoreTable({ room, title }) {

    const { players, finishTimes } = room

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
            { user_id: player.id, finish_time: Number.MAX_SAFE_INTEGER }
        )
        time.player = player
        scores.push(time)
    }
    scores.sort((a, b) => a.finish_time - b.finish_time)

    // const scores2 = Object.groupBy(finishTimes,ft => ft.user_id)

    console.log('scores:', scores)
    return (<>
        <h3 className='unmargin'> {title} </h3>
        <article className='unmargin'>
            <figure className='unmargin'>
                <table className='unmargin'>
                    <thead>
                        <tr>
                            <th scope='col'>  </th>
                            <th scope='col'> שחקן </th>
                            <th scope='col'> שם </th>
                            <th scope='col'> זמן סיום חדר  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, i) => {
                            const { player: { name, avatar } } = score

                            return <tr key={score.user_id}>
                                <th scope='row'>{getIconPerPosition(i)}</th>
                                <td>
                                    <Avatar avatarSeed={avatar} />
                                </td>
                                <td> {name || 'null'} </td>
                                <td>{
                                    score.finish_time === Number.MAX_SAFE_INTEGER ?
                                        'שגיאה'
                                        :
                                        (score.finish_time / 1000).toFixed(2) + ' שניות'
                                }</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </figure>
        </article >

    </>)
}

export default ScoreTable

function getIconPerPosition(index) {
    switch (index) {
        case 0:
            return '🥇'
        case 1:
            return '🥈'
        case 2:
            return '🥉'

        default:
            return ''
    }
} 