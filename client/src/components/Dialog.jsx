import React, { useEffect } from 'react'

function Dialog({ title, open, close, children }) {
    
    const handleClose =(e) => {
        e.preventDefault()
        close()
    }
    
    const closeByOuterClick =(e) => {
        e.preventDefault()

        if (e.target.className !== 'outer'+title) {return}
        close()
    }
    
    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    })
    const handleEsc = (e) => {
        if (e.key !== 'Escape' || !open) { return }
        close()
    }

    return (
        <>
            <dialog className={'outer'+title} open={open || false} onClick={closeByOuterClick}>
                <article>
                    <header>
                        <a href="./" aria-label="Close" onClick={handleClose} className="close"></a>
                       <h2 className='unmargin'>{title}</h2>
                    </header>
                    {children}
                </article>
            </dialog>
        </>
    )
}

export default Dialog