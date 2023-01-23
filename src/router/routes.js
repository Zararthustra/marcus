import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Navbar from '../components/Navbar';
import NoMatch from '../views/NoMatch';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: <NoMatch />
            }
        ]
    }
]);

export default routes;
