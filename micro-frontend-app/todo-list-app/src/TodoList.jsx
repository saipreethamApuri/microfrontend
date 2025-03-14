import React, { memo, useState, useEffect, lazy, Suspense } from 'react'
import styled from 'styled-components'

// Import shared components
const Button = lazy(() => import('components/Button'))

const StyledTodoList = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: ${props => props.theme === 'light' ? '#fff' : '#333'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  form {
    margin: 1rem 0;
    display: flex;
    gap: 10px;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    flex: 1;
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

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
`

const TodoList = memo(({ userId, theme, onTaskComplete }) => {
  console.log('TodoList rendering with props:', { userId, theme }) // Debug log

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Sample Task 1', completed: false },
    { id: 2, name: 'Sample Task 2', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    console.log('TodoList mounted') // Debug log
    const handleProfileUpdate = (event) => {
      console.log('Profile updated:', event.detail)
    }

    window.addEventListener('USER_UPDATED', handleProfileUpdate)
    return () => {
      window.removeEventListener('USER_UPDATED', handleProfileUpdate)
    }
  }, [])

  const handleAddTask = (e) => {
    e.preventDefault()
    console.log('Adding new task:', newTask) // Debug log
    const task = {
      id: Date.now(),
      name: newTask,
      completed: false,
    }
    setTasks(prev => [...prev, task])
    setNewTask('')
  }

  const handleComplete = (task) => {
    console.log('Completing task:', task) // Debug log
    setTasks(prev => 
      prev.map(t => t.id === task.id ? { ...t, completed: true } : t)
    )
    onTaskComplete(task.name)
  }

  return (
    <StyledTodoList theme={theme}>
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <React.Suspense fallback={<button>Loading...</button>}>
          <Button type="submit">Add</Button>
        </React.Suspense>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            {!task.completed && (
              <button onClick={() => handleComplete(task)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </StyledTodoList>
  )
})

export default TodoList 