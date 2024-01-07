import React from 'react'

function PicoButton({ className, children, onClick, ...rest }) {
  return (
    <div
      role="button"
      style={{ display: 'inline' }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

export default PicoButton