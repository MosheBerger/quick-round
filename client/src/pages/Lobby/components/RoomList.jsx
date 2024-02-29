import React from 'react'
import Avatar from '../../../components/avatar/Avatar';
import useEnterToRoom from '../hooks/enterToRoom';
import FootprintIcon from '../../../components/Icons/Footprint';
import HeartIcon from '../../../components/Icons/Heart';
import ControllerIcon from '../../../components/Icons/Controller';

function RoomList({ roomList, hidden }) {

    const enter = useEnterToRoom()

    
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
                                <td><b><ControllerIcon amount={numofrounds} /></b></td>
                                <td><b><FootprintIcon amount={playCount}/></b></td>
                                <td><HeartIcon amount={likes} /></td>
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