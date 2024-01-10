import React from 'react'

function TimingCard({ result }) {
    const { success, finish_time } = result || { success: 'error', finish_time: 'error' }
    const time = (finish_time / 1000).toFixed(2)

    return (<>
        <div style={{
            backgroundColor: success ? 'green' : 'red',
            height:'100%',
            width:'100%',
            textAlign:'center',
            borderRadius:'50px',
            padding:'3px'
        }}>
            {success ? `${time} שניות` : 'נכשל (20+ שניות)'}
        </div>
    </>)
}

export default TimingCard