import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (<>
    <header>
      <h1>Quick Round</h1>
      <h2>סבבים של מיני משחקים מהירים וקופצניים</h2>
    </header>
    <Link role='button' className='outline' to='/log-in ' > התחבר </Link>
    <Link role='button' className='outline secondary' to='sign-up'> הרשם </Link>

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
            <Link className='outline' to='/log-in ' ><b>התחברות </b></Link>
            <br />
            <Link className='outline contrast' to='sign-up'><b> הרשמה </b></Link>
            {/* <Link role='button' to='unregister' > הצטרף בלי חשבון משתמש</Link> */}
          </div>
        </section>

      </article>
    </main>

    <footer>
      <p>&copy; 2024 Quick Round</p>
    </footer>



  </>)
}

export default Home