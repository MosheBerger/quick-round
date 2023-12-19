import React from 'react'

function Input({ insertTo, type, name, setInput, value, label, min, max }) {


    return (<>
        {(label || value !== '') && <label htmlFor={name}>{name}</label>}
        <input
            type={type ? type : isValidInputType(name) ? name : 'text'}
            id={name}
            name={insertTo || name}
            placeholder={!label && name}
            value={value}
            onChange={setInput}
            min={min}
            max={max}
        />
    </>)
}

function isValidInputType(type) {
    return [
        "button", "checkbox", "color", "date", "datetime-local"
        , "email", "file", "hidden", "image", "month", "number"
        , "password", "radio", "range", "reset", "search", "submit"
        , "tel", "text", "time", "url", "week"
    ].includes(type)
}
export default Input