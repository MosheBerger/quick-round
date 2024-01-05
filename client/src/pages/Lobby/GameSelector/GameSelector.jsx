import React, { Fragment } from 'react'
import GameInfo from './GameInfo'
import fetcher from '../../../hooks/useFetch'
import BASE_URL from '../../../BASE URL'


function GameSelector({ choose, index, close }) {

  const url = `${BASE_URL}/api/games`
  const [gameList] = fetcher.useStateAndEffect(url, [])

  const handleChoose = (g) => {
    choose(g, index)
    close()
  }

  return (<>
    {gameList.map((game) => <Fragment key={game.id}>

      <GameInfo
        {...game}
        close={close}
        choose={() => handleChoose(game)}
      />

    </Fragment>)}

  </>)
}

export default GameSelector