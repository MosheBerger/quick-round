import { useEffect } from "react"

function useOuterDiv(close) {
    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    })
    const handleEsc = (e) => {
        if (e.key !== 'Escape') { return }
        close()
    }

    const handleOuterDivClose = (e) => {
        if (e.target.className === 'outer-div') {
            close()
        }
    }

    const OuterDiv = ({ children }) => <div className='outer-div' onClick={handleOuterDivClose} > {children} </div>

    return OuterDiv
}
export default useOuterDiv