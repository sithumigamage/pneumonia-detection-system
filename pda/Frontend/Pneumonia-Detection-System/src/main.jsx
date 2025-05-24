import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<HomePage/>
  },
  {
    path:'/pneumonia',
    element:<App/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
