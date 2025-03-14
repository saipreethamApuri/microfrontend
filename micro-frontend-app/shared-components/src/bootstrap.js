import React from 'react'
import { createRoot } from 'react-dom/client'
import Button from './components/Button'
import Card from './components/Card'

// Demo component to show shared components
const Demo = () => (
  <div style={{ padding: 20 }}>
    <h1>Shared Components Demo</h1>
    <Card>
      <h2>Card Component</h2>
      <p>This is a shared card component</p>
      <Button>Click Me</Button>
    </Card>
  </div>
)

const mount = () => {
  const container = document.getElementById('root')
  const root = createRoot(container)
  root.render(<Demo />)
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root')
  if (devRoot) {
    mount()
  }
}

export { mount } 