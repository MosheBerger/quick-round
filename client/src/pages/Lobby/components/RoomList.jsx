import React from 'react'
import Avatar from '../../../components/avatar/Avatar';
import useEnterToRoom from '../hooks/enterToRoom';

function RoomList({ roomList, hidden }) {

    const enter = useEnterToRoom()
    const printLikes = (likes) => {
        if (likes < 1) { return '-' }

        if (likes < 5) {
            return new Array(Number(likes)).fill('❤️').join('')
        }
        return likes + '❤️'
    }
    
    return (
        <figure>
            <table hidden={hidden}>
                <thead>
                    <tr>
                        <th> מנהל </th>
                        <th> שם </th>
                        <th> סבבים </th>
                        <th> שיחקו </th>
                        <th> אהבו </th>
                        <th> כניסה </th>
                    </tr>
                </thead>

                <tbody >
                    {roomList.map((room) => {
                        const { id, name, manager: { name: mName, avatar }, likes, userLiked, playCount, numofrounds } = room;

                        return (
                            <tr key={id}>
                                <td>
                                    <div className='flex col'>
                                        <Avatar seed={'j'} seedName={avatar.split(':')[0]} color={avatar.split(':')[1]} />
                                        <span>{mName}</span>
                                    </div>
                                </td>
                                <td>{name + (userLiked ? '❤️' : '')}</td>
                                <td><b>{numofrounds}</b></td>
                                <td><b>{playCount}</b></td>
                                <td>{printLikes(likes)}</td>
                                <td>
                                    <a href='#b' role='button' onClick={enter(id)}>
                                        כניסה
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </figure>
    )
}

export default RoomList