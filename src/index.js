import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from 'react-router-dom';

import { Footer } from "./components/Footer";
import routes from './router/routes'; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Footer />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
