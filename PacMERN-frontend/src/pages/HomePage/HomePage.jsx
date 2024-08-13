import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <div className='home'>
            <h1>Welcome!</h1>

            <Link to='/signup' id='button' className='btn btn-primary'>
                Sign Up
            </Link>
            <br />
            <Link to='/login' id='button' className='btn btn-primary'>
                Log In
            </Link>
        </div>
    );
};
