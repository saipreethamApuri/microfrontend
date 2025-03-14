import React from 'react'
import { memo, useState } from 'react'
import styled from 'styled-components'

const StyledProfile = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme === 'light' ? '#fff' : '#333'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 1rem;
  }

  input, select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: #0056b3;
    }
  }

  p {
    margin: 8px 0;
  }
`

const UserProfile = memo(({ userData, onUpdateUser }) => {
  console.log('UserProfile rendering with:', userData) // Debug log

  if (!userData) {
    console.error('UserProfile: No userData provided')
    return <div>Error: No user data</div>
  }

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form data:', formData) // Debug log
    onUpdateUser(formData)
    setIsEditing(false)
  }

  const saveChanges = () => {
    console.log('Saving changes:', formData) // Debug log
    onUpdateUser(formData)
    setIsEditing(false)
  }

  return (
    <StyledProfile theme={userData.theme}>
      <h2 style={{ color: '#007bff' }}>User Profile</h2>
      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
            />
            <select
              value={formData.theme}
              onChange={e => setFormData(prev => ({ ...prev, theme: e.target.value }))}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <button type="submit" onClick={saveChanges}>Save</button>
          </form>
        ) : (
          <div>
            <p style={{ fontWeight: 'bold' }}>Name: {userData.name}</p>
            <p style={{ fontWeight: 'bold' }}>Email: {userData.email}</p>
            <p style={{ fontWeight: 'bold' }}>Theme: {userData.theme}</p>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ marginTop: '10px' }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </StyledProfile>
  )
})

export default UserProfile 