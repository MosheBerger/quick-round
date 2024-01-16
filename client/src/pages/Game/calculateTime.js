export default function calculateTimes(results=[]) {

    return results.reduce((prev, res) => {

        return res.success ?
            prev + res.finishTime
            :
            prev + 30000
    }, 0)
}