import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div>ページ遷移はこちらから</div>
            <Link to="/" className='hover:underline py-2 px-4'>Home</Link>
            <Link to="/map" className='hover:underline py-2 px-4'>Map</Link>
        </>
    )
}

export default Header;