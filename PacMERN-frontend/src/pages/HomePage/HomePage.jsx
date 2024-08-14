import { Link } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";


export const HomePage = () => {
    return (
        <div className='home'>
            <GlobalNavBar></GlobalNavBar>
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
