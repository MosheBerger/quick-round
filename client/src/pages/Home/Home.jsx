import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserComponent from '../../components/UserComponent'
import userStorage from '../../hooks/userStorage'
import { useState } from 'react'
import Dialog from '../../components/Dialog'

function Home() {
    
  const [user, setUser] = useState(userStorage.useGet())
  const [isOpen, setOpen] = useState(false)
  const [wasUser] = useState(user)

  useEffect(() => {
    if (wasUser &&!user) setOpen(true)
  },[user,wasUser])
  
  return (<>

    <header>
      <div className='flex sb'>
        <h1>Quick Round</h1>
        <UserComponent user={user} setUser={setUser} />
      </div>

      <h2>סבבים של מיני משחקים מהירים וקופצניים</h2>
    </header>
    {user ?
      <Link role='button' className='outline' to='lobby#join'> הכנס ללובי </Link>
      : <>
        <Link role='button' className='outline' to='/log-in ' > התחבר </Link>
        <Link role='button' className='outline secondary' to='sign-up'> הרשם </Link>
      </>
    }

    <Dialog open={isOpen} close={() => setOpen(false)}>
      <h2> יצאת בהצלחה! </h2>
    </Dialog>

    <main>
      <article>

        <section className="intro">

          <p>ברוכים הבאים לאתר Quick Round, אתר מיני משחקים מטורף!</p>

          <p>האתר שלנו מציע:</p>

          <ul>
            <li>אוסף הולך וגודל של מיני משחקים בסגנון WarioWare, כולם ניתנים לשחק ישירות בדפדפן שלך.</li>
            <li>משחקים חדשים מתווספים כל הזמן, אז תמיד יש משהו חדש לנסות.</li>
            <li>צור חדרי משחק מותאמים אישית עם המשחקים האהובים עליך, ושחק עם חברים.</li>
            <li>שחק במשחקים של משתמשים אחרים וגלה יצירות חדשות ומגניבות.</li>
            <li>שתף את המשחקים שלך עם העולם ותהפוך לכוכב מיני משחקים!</li>
          </ul>

        </section>
        [תמונה של אדם משחק במשחק מיני באתר Quick Round]
        [תמונה]

        <section className="how-to-play">
          <h2>איך לשחק</h2>
          <ol>
            <li>פשוט צור חשבון בחינם.</li>
            <li>בחר מתוך מגוון רחב של מיני משחקים.</li>
            <li>צור חדר משחק והגדר כמה סבבים יהיו.</li>
            <li>התחל לשחק!</li>
          </ol>

          <p>בכל סבב, תשחק משחקון אחד. בסוף כל הסבבים, השחקן עם הכי הרבה נקודות מנצח!</p>
        </section>
        [תמונה של קבוצת חברים משחקים יחד במשחקי מיני באתר Quick Round]

        <section className="features">
          <h2>תכונות נוספות</h2>
          <ul>
            <li>צור חדרי משחק מותאמים אישית עם המשחקים האהובים עליך.</li>
            <li>שתף את המשחקים שלך עם חברים ושחק איתם באינטרנט.</li>
            <li>עקוב אחר שחקנים אחרים והשתתף בתחרויות.</li>
          </ul>
        </section>

        <section className="call-to-action">
          <h2>אז למה אתה מחכה? התחל לשחק עוד היום!</h2>

          [תמונה של לוגו Quick Round]

          <div >
            {user ?
              <Link role='button' className='outline' to='lobby#join'> הכנס ללובי </Link>
              : <>
                <Link role='button' className='outline' to='/log-in ' > התחבר </Link>
                <Link role='button' className='outline secondary' to='sign-up'> הרשם </Link>
              </>
            }
          </div>
        </section>

      </article>
    </main>

    <footer>
      <p style={{textAlign:'left'}}>&copy; Meby 2024</p>
    </footer>



  </>)
}

export default Home