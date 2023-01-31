import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Navbar from '../components/Navbar';
import NoMatch from '../views/NoMatch';
import Profil from '../components/Profil';

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
                path: '/profil/:user_id',
                element: <Profil />
            },
            {
                path: '*',
                element: <NoMatch />
            }
        ]
    }
]);

export default routes;
