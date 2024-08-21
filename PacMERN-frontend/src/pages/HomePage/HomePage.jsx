import { Link } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import FixedContainer from "../../components/Container";
import MImage from "../../assets/images/M.png";
import YellowBox from "../../components/YellowBox";
import GreenBox from "../../components/GreenBox";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// import './Homepage.css'

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ffffff',
    color: '#000099', 
    border: '3px solid black',
    padding: '10px 20px', 
    borderRadius: '0px', 
    textTransform: 'none',
    boxShadow: '-10px 8px 12px rgba(0, 0, 0, 0.2)',
     // No uppercase text
    '&:hover': {
        backgroundColor: '#D3D3D3',
        color: '#000099'
    },
}));import FixedContainer from "../../components/Container";

export const HomePage = () => {
    return (
        <div className='home'>
            <GlobalNavBar />
                <h1>WELCOME!</h1>
            <FixedContainer>
                <Link to='/signup' id='button' className='btn btn-primary'>
                    SIGN UP
                </Link>
                <br />
                <Link to='/login' id='button' className='btn btn-primary'>
                    LOG IN
                </Link>
            </FixedContainer>
        </div>
        <>
            <div className='home'>
                <GlobalNavBar />
                {/* <img src={MImage} alt="M logo" style={{ width: '70px', height: 'auto', display: 'block', margin: '0 auto' }} /> */}
                <FixedContainer>
                    <YellowBox>
                        <CustomButton component={Link} to='/signup'>
                            SIGN UP
                        </CustomButton>
                    </YellowBox>
                    <br />
                    <GreenBox>
                        <CustomButton component={Link} to='/login'>
                            LOG IN
                        </CustomButton>
                    </GreenBox>
                </FixedContainer>
            </div>
            <Footer />
        </>
    );
};