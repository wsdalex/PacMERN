import { Link } from "react-router-dom";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import FixedContainer from "../../components/Container";
import MImage from "../../assets/images/M.png";
import YellowBox from "../../components/YellowBox";
import GreenBox from "../../components/GreenBox";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
}));

export const HomePage = () => {
    return (
        <>
            <div className='home'>
                <GlobalNavBar />
                <FixedContainer>
                <Typography variant="h1" sx={{ position: 'absolute', left: '-9999px' }}>
                        Home Page
                    </Typography>
                    <YellowBox>
                        <CustomButton 
                          component={Link} 
                          to='/signup'
                          aria-label="Sign up for an account">
                            SIGN UP
                        </CustomButton>
                    </YellowBox>
                    <br />
                    <GreenBox>
                        <CustomButton component={Link} 
                         to='/login'
                         aria-label="Log in to your account">
                            LOG IN
                        </CustomButton>
                    </GreenBox>
                </FixedContainer>
            </div>
            <Footer />
        </>
    );
};