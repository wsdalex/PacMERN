import { Link } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";


export const HomePage = () => {
    return (
        <div className='home'>
            <GlobalNavBar></GlobalNavBar>
            <h1>WELCOME!</h1>

            <Link to='/signup' id='button' className='btn btn-primary'>
                SIGN UP
            </Link>
            <br />
            <Link to='/login' id='button' className='btn btn-primary'>
                LOG IN
            </Link>
        </div>
    );
};
