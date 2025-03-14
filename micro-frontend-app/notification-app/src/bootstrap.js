import React from 'react'
import { createRoot } from 'react-dom/client'
import NotificationCenter from './NotificationCenter.jsx'

const mount = (el) => {
  const root = createRoot(el)
  root.render(
    <React.StrictMode>
      <NotificationCenter 
        notifications={[
          'Welcome to the notification center!',
          'You have no new notifications'
        ]}
        theme="light"
        onClear={() => console.log('Notifications cleared')}
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