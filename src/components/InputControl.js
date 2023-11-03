import React from 'react'
import './InputControl.css'

const InputControl = (props) => {
  return (
    <div className='coontainer'>
      {props.label && <label>{props.label}</label>}
      <input type='text' {...props}></input>
    </div>
  )
}

export default InputControl
