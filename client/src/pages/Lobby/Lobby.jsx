import React from 'react'
import RoomList from './RoomList'
import CreateRoom from './CreateRoom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '../../components/avatar/Avatar'
import PicoButton from '../../components/PicoButton'
import userStorage from '../../hooks/userStrorage'

function Room() {
    const tab = useLocation().hash.slice(1)

    const user = userStorage.useGet()
    console.log(user);
    const navigate = useNavigate()

    const signOut = () => {
        userStorage.remove()
        navigate('/')

    }

    const join = (tab === 'join')
    const create = (tab === 'create')

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
            {!(join || create) &&
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
            </div>

        </header>

        <RoomList user={user} hidden={!join} />
        <CreateRoom user={user} hidden={!create} />

    </>)
}

export default Room