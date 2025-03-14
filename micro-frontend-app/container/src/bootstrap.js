import React from 'react'
import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from './App.jsx'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const mount = () => {
  const container = document.getElementById('root')
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  )
}

mount() 