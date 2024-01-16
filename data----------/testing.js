const results = [
    {
      "roundId": "49",
      "success": true,
      "finishTime": 1000
    },
    {
      "roundId": "50",
      "success": false,
      "finishTime": 165452
    },
    {
      "roundId": "50",
      "success": true,
      "finishTime": 1500
    },
    {
      "roundId": "50",
      "success": false,
      "finishTime": 1652
    }
  ]

const finishTime = results.reduce((prev, res) => {

    return res.success ?
      prev + res.finishTime
      :
      prev + 30000
  },0)
  console.log('ft', finishTime);
