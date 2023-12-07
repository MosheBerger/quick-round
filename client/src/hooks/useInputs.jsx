import { useState } from "react";

function useInputs(defaultInputsValue) {
    const [inputs, setInputs] = useState(defaultInputsValue)

    const handleChange = ({ target }) => {
        const { value, name: key } = target;

        setInputs(prev => ({ ...prev, [key]: value }))
    }
    return [inputs, handleChange]
}
export default useInputs