import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme === 'light' ? '#ddd' : '#444'};
  border-radius: 4px;
  background: ${props => props.theme === 'light' ? '#fff' : '#333'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  font-size: 14px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }

  &::placeholder {
    color: ${props => props.theme === 'light' ? '#999' : '#666'};
  }

  &:disabled {
    background: ${props => props.theme === 'light' ? '#f5f5f5' : '#444'};
    cursor: not-allowed;
  }
`

const Input = ({ theme = 'light', fullWidth = false, ...props }) => {
  return (
    <StyledInput 
      theme={theme} 
      fullWidth={fullWidth} 
      {...props} 
    />
  )
}

export default Input 