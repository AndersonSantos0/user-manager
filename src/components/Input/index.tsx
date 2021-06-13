import React, { useState } from 'react'
import { InputContainer, InputIcon, InputLabel, InputFeedBack } from './styles'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import TextInputMask from 'react-masked-text'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  type?: 'text' | 'password' | 'button' | 'date' | 'document'
  error?: boolean
  errorMessage?: string
  onClick?: () => void
  onChange?: (value) => void
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  type = 'text',
  placeholder,
  onClick,
  onChange,
  error,
  errorMessage
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [hasIcon] = useState(type === 'password')

  return (
    <InputContainer error={error} hasIcon={hasIcon}>
      <InputLabel>{label}</InputLabel>
      <div>
        {['document', 'date'].includes(type) ? (
          <TextInputMask
            value={value}
            kind={
              (type === 'document' && 'cpf') || (type === 'date' && 'datetime')
            }
            options={{ format: type === 'date' && 'DD-MM-YYYY' }}
            placeholder={placeholder}
            onClick={onClick}
            onChangeText={e => onChange && onChange(e)}
          />
        ) : (
          <input
            value={value}
            placeholder={placeholder}
            type={showPassword ? 'text' : type}
            onClick={onClick}
            onChange={e => onChange && onChange(e.target.value)}
          />
        )}
        {type === 'password' && (
          <InputIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <BsEyeSlash size={'1.25rem'} />
            ) : (
              <BsEye size={'1.25rem'} />
            )}
          </InputIcon>
        )}
      </div>
      {error && (
        <InputFeedBack>{errorMessage || 'Valor inválido'}</InputFeedBack>
      )}
    </InputContainer>
  )
}

export default Input
