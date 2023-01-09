import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div>Home</div>
            <Link to={`/profile`}>Profile</Link>
            <Link to={`/community`}>Community</Link>
            <Outlet />
        </>
    )
}

export default Home