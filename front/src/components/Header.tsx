import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
        <div className="bg-black text-white font-bold py-4 px-6 shadow-md flex justify-between items-center">
            <div className="text-lg">Map App</div>
            <div className="flex space-x-6">
            <Link
                to="/"
                className="hover:underline text-white transition duration-200"
            >
                Home
            </Link>
            <Link
                to="/map"
                className="hover:underline text-white transition duration-200"
            >
                Map
            </Link>
            </div>
        </div>
        </>

    )
}

export default Header;
