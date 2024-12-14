import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
        <div className="bg-black text-white font-bold py-4 px-6 shadow-md flex justify-between items-center">
            <div className="text-lg">
                <Link
                    to="/"
                    className="hover:underline text-white transition duration-200"
                >
                    Map App
                </Link>
            </div>
        </div>
        </>

    )
}

export default Header;
