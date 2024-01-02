import React from 'react'
import useInputs from '../../../hooks/useInputs'

function GameSettings({ settings }) {
  const keys = Object.keys(settings)
  const [inputs, handleChange] =useInputs(settings)

  // const Elements =

  //   console.log('ele', Elements);

  return (<form>
    {keys.map((key) => {
      const val = settings[key]

      if (typeof val === 'string') {
        return <input value={inputs[key]} name={key} onChange={handleChange} key={key} placeholder={val} />
      }

      if (Array.isArray(val)) {
        return <select key={key} name={key}>

          {val.map(({ name, value }) => (
            <option
              key={value}
              value={value}
            >
              {name}
            </option>
          ))}

        </select>
      }

      return <></>
    })}
  </form>)
}

export default GameSettings