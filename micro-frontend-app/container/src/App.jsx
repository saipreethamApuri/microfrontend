import React from 'react'
import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

// Import shared components
const Button = lazy(() => import('components/Button'))
const Card = lazy(() => import('components/Card'))

// Remote micro frontends
const UserProfile = lazy(() => import('userProfile/UserProfile'))
const TodoList = lazy(() => import('todoList/TodoList'))
const NotificationCenter = lazy(() => import('notificationCenter/NotificationCenter'))

const AppContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
`

const Navigation = styled.nav`
  background: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  ul {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      background-color: #007bff;
      color: white;
    }
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in component:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>
    }

    return this.props.children
  }
}

const App = () => {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    theme: 'light',
  })

  const [notifications, setNotifications] = useState([])

  const userProfileProps = {
    userData: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      theme: 'light',
    },
    onUpdateUser: (updatedUser) => {
      console.log('User updated:', updatedUser)
      setUser(updatedUser)
      window.dispatchEvent(new CustomEvent('USER_UPDATED', { detail: updatedUser }))
    },
  }

  const todoListProps = {
    userId: user.id,
    theme: user.theme,
    onTaskComplete: (taskName) => {
      setNotifications(prev => [...prev, `Task completed: ${taskName}`])
      window.dispatchEvent(
        new CustomEvent('TASK_COMPLETED', { 
          detail: { taskName, userId: user.id }
        })
      )
    },
  }

  const notificationProps = {
    notifications,
    theme: user.theme,
    onClear: () => setNotifications([]),
    userData: {
      id: user.id,
      name: user.name,
      email: user.email,
      theme: user.theme,
    },
    onUpdateUser: (updatedUser) => {
      console.log('User updated from notification center:', updatedUser)
      setUser(updatedUser)
      window.dispatchEvent(new CustomEvent('USER_UPDATED', { detail: updatedUser }))
    },
  }

  return (
    <BrowserRouter>
      <AppContainer>
        <Navigation>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/todos">Todo List</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
          </ul>
        </Navigation>
        <MainContent>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route 
                path="/profile" 
                element={
                  <ErrorBoundary>
                    <UserProfile {...userProfileProps} />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/todos" 
                element={
                  <ErrorBoundary>
                    <TodoList {...todoListProps} />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ErrorBoundary>
                    <NotificationCenter {...notificationProps} />
                  </ErrorBoundary>
                } 
              />
              <Route 
                path="/" 
                element={
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <h2>Welcome to My Workspace</h2>
                    <p>Select a section from the navigation above</p>
                  </div>
                } 
              />
            </Routes>
          </Suspense>
        </MainContent>
      </AppContainer>
    </BrowserRouter>
  )
}

export default App