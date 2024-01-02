import React from 'react'
import './input.module.css'

function Input({ insertTo, type, name, setInput, value, label, min, max }) {

    type = type || setType(insertTo, name)

    const show = (label || value !== '')

    return (<>
        <label hidden={!show} htmlFor={name}>{name}</label>
        <input
            type={type}
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

function setType(insertTo, name) {
    if (insertTo) {
        return isValidInputType(insertTo)? insertTo : 'text'
    }
    return isValidInputType(name)? name : 'text'
}
export default Input