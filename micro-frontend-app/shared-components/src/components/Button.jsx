import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${props => props.variant === 'primary' ? '#0056b3' : '#5a6268'};
  }
`

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button 