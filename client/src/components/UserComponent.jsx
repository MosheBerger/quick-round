import React from 'react';
import PicoButton from './PicoButton';
import { useNavigate } from 'react-router-dom';
import userStorage from '../hooks/userStorage';
import Avatar from './avatar/Avatar';

function UserComponent({ user,setUser }) {
    
    const navigate = useNavigate()
    
    if (!user) return null
    const signOut = () => {
        userStorage.remove()
        navigate('/')
        setUser?.(null)
    }
    console.log('user', user);
    return (
        <div style={{ padding: 2, width: "20vw" }} className='unmargin flex'>
            <Avatar avatarSeed={user?.avatar} />
            <h4 className='unmargin'> {user?.name} </h4>
            <PicoButton className='contrast outline' onClick={signOut}> יציאה </PicoButton>{/* //todo */}
        </div>
    );
}

export default UserComponent;