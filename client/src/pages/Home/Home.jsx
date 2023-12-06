import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (<>
    <header>
      <h1>Quick Round</h1>
      <h4>A competitive online games website</h4>
    </header>

    <main>

      <p>
        some text very interesting about our website and our amazing games
      </p>

      <div>
        <Link to='/log-in ' > log-in </Link>
          <Link to='sign-up'> sign-up </Link>
          <button> join without user </button>
        </div>

        </main>

        <footer>
          do we really need this?
        </footer>
      </>)
}

      export default Home