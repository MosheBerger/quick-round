import React from 'react'

function PicoButton({ children, onClick, outline, ...rest }) {
  return (
    <div
      role="button"
      style={{ display: 'inline', margin: '5px' }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

export default PicoButton