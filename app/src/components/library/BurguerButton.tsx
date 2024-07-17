//@ts-nocheck
import React from 'react'

function BurguerButton({ handleClick, clicked }) {
  return (
    <div className="w-9 h-8 mt-4 mr-4 cursor-pointer relative inline-block" onClick={handleClick}>
      <div className={`w-full h-1 bg-white absolute transition-transform duration-500 ${clicked ? 'rotate-45' : ''} ${!clicked ? 'hover:rotate-3 hover:scale-y-110' : ''}`} style={{ top: '0px', left: '0px', transformOrigin: 'center' }}></div>
      <div className={`w-full h-1 bg-white absolute transition-transform duration-500 ${clicked ? 'opacity-0' : ''} ${!clicked ? 'hover:rotate-3 hover:scale-y-110' : ''}`} style={{ top: '50%', left: '0px', transformOrigin: 'center' }}></div>
      <div className={`w-full h-1 bg-white absolute transition-transform duration-500 ${clicked ? 'rotate--45' : ''} ${!clicked ? 'hover:rotate--4 hover:scale-y-110' : ''}`} style={{ bottom: '0px', left: '0px', transformOrigin: 'center' }}></div>
    </div>
  )
}

export default BurguerButton