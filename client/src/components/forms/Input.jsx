import React from 'react'

function Input({ name, setInput, value }) {

    return (
        <input type={isValidInputType(name) ? name : 'text'} name={name} placeholder={name} value={value} onChange={setInput} />
    )
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