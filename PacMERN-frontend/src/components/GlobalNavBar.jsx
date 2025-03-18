import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link, useNavigate } from 'react-router-dom';
import M64 from '../assets/images/M64Logo.png';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "0px",
    border: '2px solid black',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '65%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '30ch',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "grey"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        color: "#000099",
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
}));

export default function GlobalNavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorMenuIconEl, setAnchorMenuIconEl] = React.useState(null);

    const navigate = useNavigate();

    const handleMenuIconClick = (event) => {
        setAnchorMenuIconEl(event.currentTarget);
    };

    const handleMenuIconClose = () => {
        setAnchorMenuIconEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileSubmit = () => {
        navigate("/profile");
        handleMenuClose();
    };

    const handleGamePageSubmit = () => {
        navigate("/games");
    };

    const handleFriendsPageSubmit = () => {
        navigate("/friends");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="absolute"
                sx={{
                    width: '100%',
                    height: 'auto',
                    padding: '0 10px',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '3px solid black',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                <Box
                sx={{
                mr: 1,
                 '& img': {
                 width: 'clamp(30px, 5vw, 60px)',
                 height: 'auto',
                },
                }}
                aria-label="Go to homepage"
            >
            <Link
             to="/"
            style={{
            display: 'inline-block', // Ensures the link wraps the image properly
            textDecoration: 'none', // Removes any default link styling
        }}
    >
        <img 
            src={M64} 
            alt="M64 logo image" 
            style={{ display: 'block' }} // Ensures the image takes up its full space
        />
    </Link>
</Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color="#000099"
                        sx={{
                            fontSize: 'clamp(1rem, 3vw, 3rem)',
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        MAKERS<span style={{ fontSize: '0.6em', color: '#E60000', verticalAlign: 'super' }}>64</span>
                    </Typography>

                    <Search sx={{ flexGrow: 1, maxWidth: '300px' }}>
                        <SearchIconWrapper>
                            <SearchIcon aria-hidden="true" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            inputProps={{
                                'aria-label': 'Search input box',
                                'aria-describedby': 'search-description',
                            }}
                        />
                    </Search>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'space-around',
                            width: '100%',
                            maxWidth: '300px',
                            mt: { xs: 1, md: 0 },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="Go to games page"
                            onClick={handleGamePageSubmit}
                            sx={{
                                border: '2px solid black',
                                backgroundColor: '#000099',
                                width: 'clamp(30px, 5vw, 41px)',
                                height: 'clamp(30px, 5vw, 41px)',
                                borderRadius: '50%',
                                '&:focus': {
                                    outline: '3px solid #FFC001',
                                },
                            }}
                        >
                            <SportsEsportsIcon aria-hidden="true" />
                        </IconButton>

                            <IconButton
                                size="large"
                                aria-label="View messages"
                                sx={{
                                    border: '2px solid black',
                                    backgroundColor: '#FFC001',
                                    width: 'clamp(30px, 5vw, 41px)',
                                    height: 'clamp(30px, 5vw, 41px)',
                                    borderRadius: '50%',
                                    '&:focus': {
                                        outline: '3px solid #FFC001',
                                    },
                                }}
                            >
                                <Badge color="error">
                                    <MailIcon aria-hidden="true" />
                                </Badge>
                            </IconButton>

                        <IconButton
                            size="large"
                            aria-label="Go to friends page"
                            onClick={handleFriendsPageSubmit}
                            sx={{
                                border: '2px solid black',
                                backgroundColor: '#069330',
                                width: 'clamp(30px, 5vw, 41px)',
                                height: 'clamp(30px, 5vw, 41px)',
                                borderRadius: '50%',
                                '&:focus': {
                                    outline: '3px solid #FFC001',
                                },
                            }}
                        >
                            <PeopleIcon aria-hidden="true" />
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-label="Open profile menu"
                            onClick={handleProfileMenuOpen}
                            sx={{
                                border: '2px solid black',
                                backgroundColor: '#E60000',
                                width: 'clamp(30px, 5vw, 41px)',
                                height: 'clamp(30px, 5vw, 41px)',
                                borderRadius: '50%',
                                '&:focus': {
                                    outline: '3px solid #FFC001',
                                },
                            }}
                        >
                            <AccountCircle aria-hidden="true" />
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-label="log out"
                            onClick={handleLogout}
                            sx={{
                                color: '#000099',
                                backgroundColor: "white", 
                                ml: 1,
                                width: 'clamp(30px, 5vw, 41px)',
                                height: 'clamp(30px, 5vw, 41px)',
                                marginRight: '8px',
                                '&:focus': {
                                    outline: '3px solid #FFC001',
                                    outlineOffset: '2px',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 'clamp(12px, 2vw, 16px)', 
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    textShadow: 'none', 
                                    outline: 'none',
                                }}
                            >
                                Logout
                            </Typography>
                        </IconButton>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
