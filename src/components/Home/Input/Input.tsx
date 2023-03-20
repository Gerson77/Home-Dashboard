import React, { InputHTMLAttributes, useCallback } from 'react'
import { phoneNumber } from './mask'

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    ...props
}) => {

    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        phoneNumber(e)
    },[])

  return (
    <div>
        <input {...props} onKeyUp={handleKeyUp} />
    </div>
  )
}

export default Input