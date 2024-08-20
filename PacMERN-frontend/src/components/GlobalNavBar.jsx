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
import { useNavigate } from 'react-router-dom';

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

    const isMenuOpen = Boolean(anchorEl);
    const [anchorMenuIconEl, setAnchorMenuIconEl] = React.useState(null);
    const isMenuIconOpen = Boolean(anchorMenuIconEl);

const handleMenuIconClick = (event) => {
    setAnchorMenuIconEl(event.currentTarget);
};

const handleMenuIconClose = () => {
    setAnchorMenuIconEl(null);
};


    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'white',
                    color: '#000099',
                    border: "3px solid black",
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Optional: add a shadow for better visibility
                },
            }}
        >
            <MenuItem onClick={handleProfileSubmit}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
    );

    const renderMenuIconDropdown = (
        <Menu
            anchorEl={anchorMenuIconEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id="menu-icon-dropdown"
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuIconOpen}
            onClose={handleMenuIconClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'white',
                    color: '#000099',
                    border: "3px solid black",
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <MenuItem onClick={() => { handleGamePageSubmit(); handleMenuIconClose(); }}>Games</MenuItem>
            <MenuItem onClick={handleMenuIconClose}>Messages</MenuItem>
            <MenuItem onClick={handleMenuIconClose}>Friends</MenuItem>
            <MenuItem onClick={() => { handleProfileSubmit(); handleMenuIconClose(); }}>Profile</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="#000099">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="absolute"
                sx={{
                    width: '100%',
                    height: 60,
                    padding: '0 10px',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '3px solid black',
                    boxSizing: 'border-box',
                }}
            >
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, color: "black" }}
                    onClick={handleMenuIconClick}
                    >
                <MenuIcon sx={{ fontSize: 60 }} />
                </IconButton>
                {renderMenuIconDropdown}


                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color="#000099"
                        fontSize="55px"
                        sx={{ display: { xs: 'none', sm: "block" } }}
                    >
                        MAKERS<span style={{ fontSize: 30, color: '#ff2d1e', verticalAlign: 'super' }}>64</span>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder=""
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', color: "#069330" } }}>
                        
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="game page"
                            aria-haspopup="true"
                            onClick={handleGamePageSubmit}
                            sx={{ border: "2px solid black", color: 'white', backgroundColor: "#000099", ml: 1 , width: 41, height: 41, borderRadius: '50%', marginRight: '16px'}} 
                        >
                            <SportsEsportsIcon />
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            sx={{ border: "2px solid black", color: 'white', backgroundColor: "#FFC001", mr: 1 , width: 41, height: 41, borderRadius: '50%'}} 
                        >
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-label="friends"
                            sx={{ border: "2px solid black", color: 'white', backgroundColor: "#069330", mx: 1 , width: 41, height: 41, borderRadius: '50%'}} 
                        >
                            <PeopleIcon />
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            sx={{ border: "2px solid black", color: 'white', backgroundColor: "#ff2d1e", ml: 1 , width: 41, height: 41, borderRadius: '50%'}} 
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}