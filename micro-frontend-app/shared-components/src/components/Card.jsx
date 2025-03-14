import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme === 'light' ? '#fff' : '#333'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
`

const Card = ({ children, theme = 'light' }) => {
  return (
    <StyledCard theme={theme}>
      {children}
    </StyledCard>
  )
}

export default Card 