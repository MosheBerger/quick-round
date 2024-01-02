import React from 'react'
import GameInfo from './GameInfo'

const game = [
  {
    "id": 1,
    "name": "טריוויה",
    "description": "שאלת טריוויה מהירה בהתאמה אישית",
    "settings": {
      "question": "שאלה",
      "answerA": "תשובה 1",
      "answerB": "תשובה 2",
      "answerC": "תשובה 3",
      "answerD": "תשובה 4",
      "trueAnswer": [
        {
          "name": "תשובה 1",
          "value": "answerA"
        },
        {
          "name": "תשובה 2",
          "value": "answerB"
        },
        {
          "name": "תשובה 3",
          "value": "answerC"
        },
        {
          "name": "תשובה 4",
          "value": "answerD"
        }
      ]
    },
    "imageurl": "/covers/trivia.png",
    "genre": "חידה"
  },
  {
    "id": 3,
    "name": "טריוויה",
    "description": "שאלת טריוויה מהירה בהתאמה אישית",
    "settings": {
      "question": "שאלה",
      "answerA": "תשובה 1",
      "answerB": "תשובה 2",
      "answerC": "תשובה 3",
      "answerD": "תשובה 4",
      "trueAnswer": [
        {
          "name": "תשובה 1",
          "value": "answerA"
        },
        {
          "name": "תשובה 2",
          "value": "answerB"
        },
        {
          "name": "תשובה 3",
          "value": "answerC"
        },
        {
          "name": "תשובה 4",
          "value": "answerD"
        }
      ]
    },
    "imageurl": "/covers/trivia.png",
    "genre": "חידה"
  },
  {
    "id": 4,
    "name": "טריוויה",
    "description": "שאלת טריוויה מהירה בהתאמה אישית",
    "settings": {
      "question": "שאלה",
      "answerA": "תשובה 1",
      "answerB": "תשובה 2",
      "answerC": "תשובה 3",
      "answerD": "תשובה 4",
      "trueAnswer": [
        {
          "name": "תשובה 1",
          "value": "answerA"
        },
        {
          "name": "תשובה 2",
          "value": "answerB"
        },
        {
          "name": "תשובה 3",
          "value": "answerC"
        },
        {
          "name": "תשובה 4",
          "value": "answerD"
        }
      ]
    },
    "imageurl": "/covers/trivia.png",
    "genre": "חידה"
  },
  {
    "id": 5,
    "name": "name",
    "description": "2",
    "settings": 2,
    "imageurl": "2",
    "genre": "2"
  }
]

function GameSelector({ choose, index, close }) {
  const handleChoose = (g) => {
    choose(g, index)
    close()
  }
  return (<>
    {game.map(g => <GameInfo key={g.id} {...g} choose={() => handleChoose(g)} />)}

  </>)
}

export default GameSelector