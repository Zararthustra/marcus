import { createBrowserRouter } from 'react-router-dom'
import Home from '../views/Home';
import Community from '../views/Community';
import Profile from '../views/Profile';
import NoMatch from '../views/NoMatch';
import Navbar from '../components/Navbar';

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
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/community',
                element: <Community />,
                children: [
                    {
                        path: '/community/{user_id}',
                        element: <Profile role="user" />,
                        role: 'user'
                    }
                ]
            },
            {
                path: '*',
                element: <NoMatch />
            }
        ]
    }
]);

export default routes;
