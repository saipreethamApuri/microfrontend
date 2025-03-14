import React from 'react'
import { createRoot } from 'react-dom/client'
import TodoList from './TodoList.jsx'

const mount = (el) => {
  const root = createRoot(el)
  root.render(
    <React.StrictMode>
      <TodoList 
        userId={1}
        theme="light"
        onTaskComplete={(taskName) => console.log('Task completed:', taskName)}
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