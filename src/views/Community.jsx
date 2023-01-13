import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Community = () => {
    return (
        <>
            <div>Community</div>
            <Link to={`/profile`}>Profile</Link>
            <Link to={`/community`}>Community</Link>
            <Outlet />
        </>
    )
}

export default Community