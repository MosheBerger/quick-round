import React, { useEffect } from 'react'
import AllRooms from './tabs/AllRooms'
import CreateRoom from './tabs/CreateRoom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'
import PicoButton from '../../components/PicoButton'
import userStorage from '../../hooks/userStorage'
import MyRooms from './tabs/MyRooms'
import LikedRooms from './tabs/LikedRooms'
import useReturnToHomeIfNoUser from '../../hooks/useReturnToHomeIfNoUser'

function Room() {
    const tab = useLocation().hash.slice(1)
    const navigate = useNavigate()

    const user = userStorage.useGet()

    const signOut = () => {
        userStorage.remove()
        navigate('/')

    }
    useReturnToHomeIfNoUser()
    
    const join = (tab === 'join')
    const create = (tab === 'create')
    const mine = (tab === 'mine')
    const liked = (tab === 'liked')

    if (!user) {return <></>}

    return (<>
        <header>

            <div className='flex sb'>
                <h1 className='unmargin'>לובי</h1>

                <div style={{ padding: 2, width: "20vw" }} className='unmargin flex'>
                    <Avatar avatarSeed={user?.avatar} />
                    <h4 className='unmargin'> {user?.name} </h4>
                    <PicoButton className='contrast outline' onClick={signOut}> יציאה </PicoButton>{/* //todo */}
                </div>
            </div>
            <br />
            {tab === '' &&
                <article>
                    <h2 className='unmargin'>
                        ברוכים הבאים ללובי
                    </h2>
                    <b className='unmargin'>
                        כאן תוכלו לשחק בחדרי משחק שנבנו באתר, או לבנות אחד בעצמכם!
                    </b>
                    <p className='unmargin'>
                        כל חדר מכיל תחרות עם כמה סבבים,
                        כשבכול סבב יהיה משחקון שהוגדר מראש על ידי מנהל החדר.
                        המטרה היא לעבור את החדר כמה שיותר מהר מבלי לטעות כמובן...
                        <b> בהצלחה! </b>
                    </p>
                </article>
            }

            <div className='tabs'>
                <Link to='#join' role='button' state={{ user }} className={join ? '' : 'outline'}  >
                    רשימת חדרים
                </Link>

                <Link to='#create' role='button' state={{ user }} className={create ? '' : 'outline'} >
                    צור חדר
                </Link>

                <Link to='#mine' role='button' state={{ user }} className={mine ? '' : 'outline'} >
                    החדרים שלי
                </Link>

                <Link to='#liked' role='button' state={{ user }} className={liked ? '' : 'outline'} >
                    חדרים שאהבתי
                </Link>
            </div>

        </header>

        <AllRooms user={user} hidden={!join} />
        <CreateRoom user={user} hidden={!create} />
        <MyRooms user={user} hidden={!mine} />
        <LikedRooms user={user} hidden={!liked} />


    </>)
}

export default Room