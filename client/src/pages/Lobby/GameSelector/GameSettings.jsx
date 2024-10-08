import React, { Fragment, useState } from 'react'

// const SETTINGS = {
//   number: { name: 'מספר', type: 'N', min: 3, max: 10 },
//   number2: { name: '2מספר', type: 'N' }, //number without max min
//   // color: { name: 'צבע', type: 'C' },
//   text: { name: 'טקסט', type: 'T' },
//   selector: {
//     name: 'בחירה', type: 'S',
//     options: [
//       { name: 'א', value: 'a' },
//       { name: 'ב', value: 'b' },
//       { name: 'ג', value: 'c' },
//     ]
//   },
// }


function GameSettings({ settings, userSettings, choose }) {

  const keys = Object.keys(settings)


  const [inputs, setInputs] = useState(() => {

    const INITIAL_STATE = {}
    for (const key of keys) {

      if (userSettings) {

        INITIAL_STATE[key] = userSettings[key]

      } else {
        INITIAL_STATE[key] = ''

      }
    }
    return INITIAL_STATE
  })

  const isComplete = () => {
    for (const key of keys) {
      if (!inputs[key]) { return false }
    }
    return true
  }

  const finish = isComplete()

  const handleChange = ({ target }) => {

    let { value, name: key, type, min, max } = target;

    if (type === 'number' || type === 'range') {
      value = parseInt(value)
      min = parseInt(min)
      max = parseInt(max)
      if (Number.isNaN(value)) { value = min }

      if (max && max < value) { value = max }
      else if (min && min > value) { value = min }

    }
    // if (type === 'text') {
    //   value = value.trimStart()
    // }

    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    choose(inputs)
  }

  return (<form>
    {keys.map((key) => {

      const { name, type: rawType, options, min, ...rest } = settings[key]
      const type = extractType(rawType)

      if (type !== 'select' && type!== 'number') {
        return (<Fragment key={key}>
          
          <label>
            {name}
            </label>
            <textarea
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              type={type}
              {...rest}
            />
        </Fragment>)
      }
      if (type !== 'select'){
        return (

          <label key={key}>
            {name+"  " + inputs[key]}
            {min && !inputs[key] && <small>הזז את הסרגל</small>}
            <input
              name={key}
              value={inputs[key]}
              onChange={handleChange}
              type={min ?'range':'number'}
              min={min|| Number.MIN_SAFE_INTEGER}
              {...rest}
            />
          </label>
        )
      }

      return (

        <label key={key}>
          {name}
          <select defaultValue={inputs[key]} name={key} onChange={handleChange}>
            <option value={''}> -בחר- </option>
            {options.map(({ name, value }) => (
              <option
                key={value}
                value={value}
              >
                {name}
              </option>
            ))}

          </select>
        </label>

      )
    }

    )}

    <button disabled={!finish} onClick={handleSave}> שמור </button>
  </form >)
}

export default GameSettings


function extractType(rawType = '') {
  switch (rawType.charAt(0)) {
    case 'T':
      return 'text'

    case 'N':
      return 'number'

    case 'S':
      return 'select'

    case 'C':
      return 'color'

    default:
      break;
  }
}