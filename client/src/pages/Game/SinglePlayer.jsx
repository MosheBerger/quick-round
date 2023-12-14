import React from 'react'
import TestGame from '../../games/TheGames/game 1 test/TestGame.jsx'
import Trivia from '../../games/TheGames/Trivia/Trivia.jsx'

function SinglePlayer() {
  return (
    <div className='middle'>
      {/* <TestGame /> */}
      <Trivia />
    </div>
  )
}

export default SinglePlayer