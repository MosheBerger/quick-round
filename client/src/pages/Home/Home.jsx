import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (<>
    <header>
      <h1>Quick Round</h1>
      <h4> אתר למשחקי אונליין תחרותיים </h4>
    </header>

    <main>

      <p>
        איזשהו טקסט על האתר המדהים המעניין והמושלם שלנו
        עם כל המשחקים שיש בו
      </p>

      <div >
        <Link role='button' className='outline' to='/log-in ' > התחבר </Link>
        <Link role='button' className='outline secondary' to='sign-up'> הרשם </Link>
        <br />
        {/* <Link role='button' to='unregister' > הצטרף בלי חשבון משתמש</Link> */}
      </div>

    </main>

  </>)
}

export default Home