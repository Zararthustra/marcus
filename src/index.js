import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

//import Home from './views/Home';
import Community from './views/Community';
import Profile from './views/Profile';
import NoMatch from './views/NoMatch';
import App from "./App";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
    children: [
      {
        path: '/home',
        element: <App />
      },
      {
        path: '/community',
        element: <Community />,
        children: [
          {
            path: '/community/profile',
            element: <Profile role="user" />,
            role: 'user'
          }
        ]
      },
      {
        path: '/profile',
        element: <Profile />
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

/*
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
*/

reportWebVitals();
