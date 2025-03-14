import React, { memo, lazy, Suspense } from 'react'
import styled from 'styled-components'

const UserProfile = lazy(() => import('userProfile/UserProfile'))

const StyledNotifications = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme === 'light' ? '#fff' : '#333'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .profile-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme === 'light' ? '#eee' : '#444'};
  }

  .notification {
    padding: 10px;
    margin: 8px 0;
    border-radius: 4px;
    background: ${props => props.theme === 'light' ? '#f0f0f0' : '#444'};
    transition: all 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: #c82333;
    }
  }

  h2 {
    color: ${props => props.theme === 'light' ? '#007bff' : '#66b0ff'};
    margin-bottom: 1rem;
  }

  .empty-state {
    text-align: center;
    padding: 20px;
    color: #666;
  }
`

const NotificationCenter = memo(({ notifications = [], theme = 'light', onClear, userData, onUpdateUser }) => {
  console.log('NotificationCenter rendering with:', { notifications, theme })

  return (
    <StyledNotifications theme={theme}>
      <div className="profile-section">
        <Suspense fallback={<div>Loading profile...</div>}>
          <UserProfile userData={userData} onUpdateUser={onUpdateUser} />
        </Suspense>
      </div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <>
          <div>
            {notifications.map((notification, index) => (
              <div key={index} className="notification">
                {notification}
              </div>
            ))}
          </div>
          <button onClick={onClear}>Clear All</button>
        </>
      ) : (
        <div className="empty-state">
          No new notifications
        </div>
      )}
    </StyledNotifications>
  )
})

export default NotificationCenter 