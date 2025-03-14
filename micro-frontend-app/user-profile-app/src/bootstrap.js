import React from 'react'
import { createRoot } from 'react-dom/client'
import UserProfile from './UserProfile.jsx'

const mount = (el) => {
  const root = createRoot(el)
  root.render(
    <React.StrictMode>
      <UserProfile 
        userData={{
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          theme: 'light'
        }}
        onUpdateUser={(userData) => console.log('User updated:', userData)}
      />
    </React.StrictMode>
  )
}

// Mount immediately if in development and running in isolation
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root')
  if (devRoot) {
    mount(devRoot)
  }
}

// Export mount function for container
export { mount }