import React from 'react'
import CreateRoom from './tabs/CreateRoom'
import { Link, useLocation} from 'react-router-dom'
import userStorage from '../../hooks/userStorage'
import useReturnToHomeIfNoUser from '../../hooks/useReturnToHomeIfNoUser'
import GetListByTab from './tabs/GetListByTab'
import UserComponent from '../../components/UserComponent'

function Room() {
    const tab = useLocation().hash.slice(1)

    const user = userStorage.useGet()


    useReturnToHomeIfNoUser()

    const join = (tab === 'join')
    const create = (tab === 'create')
    const mine = (tab === 'mine')
    const liked = (tab === 'liked')
    console.log(tab);

    if (!user) { return <></> }

    return (<>
        <header>

            <div className='flex sb'>

                <h1 className='unmargin'>לובי</h1>

                <UserComponent user={user} />
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

        <GetListByTab user={user} tab={tab} hidden={create} />
        <CreateRoom user={user} hidden={!create} />


    </>)
}

export default Room