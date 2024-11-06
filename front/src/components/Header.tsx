import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='bg-black hover:bg-green-700 text-white font-bold py-2 px-4 '>
                <div>ページ遷移はこちらから</div>
                <Link to="/" className='hover:underline py-2 px-4'>Home</Link>
                <Link to="/map" className='hover:underline py-2 px-4'>Map</Link>
            </div>
        </>
    )
}

export default Header;
