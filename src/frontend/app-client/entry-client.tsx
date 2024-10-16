import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { router } from '../app/router/router.js'

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    )
}
