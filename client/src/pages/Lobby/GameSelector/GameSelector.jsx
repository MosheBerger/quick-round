import React, { Fragment } from 'react'
import GameInfo from './GameInfo'
import fetcher from '../../../hooks/useFetch'
import BASE_URL from '../../../BASEURL'


function GameSelector({ chosenGame,choose, index, close }) {

  const url = `${BASE_URL}/api/games`
  const [gameList] = fetcher.useStateAndEffect(url, [])

  const handleChoose = (g) => {
    choose(g, index)
    close()
  }

  return (<>
    {gameList.map((game) => <Fragment key={game.id}>

      <GameInfo
        game={game}
        chosenGame={game.id === chosenGame.id ? chosenGame : undefined}
        choose={handleChoose}
      />

    </Fragment>)}

  </>)
}

export default GameSelector