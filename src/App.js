import './App.css';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { CssBaseline, Drawer, IconButton, Stack, Typography, Toolbar, Divider, Button, Box, List, ListItemButton, ListItemText, ListItem } from '@mui/material';
import { CenterFocusStrong, ChevronLeft, Menu } from '@mui/icons-material'
import { useMemo, useState, useEffect } from 'react';
import LoginModal from './data/LoginModal';
import {
  ThemeProvider,
  styled,
  useTheme,
  createTheme,
} from "@mui/material/styles";
import UserMenu from './data/UserMenu'
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

const create_pallete = (mode) => {
  let result = {};
  if (mode === 'light') {
    result = {
      mode: 'light',
      primary: {
        main: "#85adad"
      },
      text: {
        primary: '#c32a0b',
        secondary: '#c32a0b'
      }
    }
  } else {
    result = {
      mode: 'dark'
    }
  }

  return { palette: result };
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function App() {
  const navigate = useNavigate();



  const [openDrawer, setOpenDrawer] = useState(false);
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createTheme(create_pallete(mode)), [mode]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      setIsLogin(true);
    }
  }, [showModal, isLogin])


  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/')
  }

  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={openDrawer}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
              onClick={handlerDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h3' component='div' sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>eDiary</Typography>
            {isLogin ? <UserMenu user={user} logout={logout} /> : <Button color='inherit' onClick={() => setShowModal(true)}> Login </Button>}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader>
            <IconButton onClick={handlerDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {isLogin && user.role === "ROLE_ADMIN" ? <ListItem disablePadding component={NavLink} to="subjects">
              <ListItemButton>
                <ListItemText primary="Subjects" />
              </ListItemButton>
            </ListItem> : <></>}
            {isLogin ? <ListItem disablePadding component={NavLink} to="grades">
              <ListItemButton>
                <ListItemText primary="Grades" />
              </ListItemButton>
            </ListItem> : <></>}
          </List>
        </Drawer>
        <Main open={openDrawer}>
          <DrawerHeader />
          {showModal && <LoginModal show={showModal} handleCloseModal={() => setShowModal(false)} />}
          <Outlet></Outlet>
        </Main>
      </Box>
    </ThemeProvider >
  );
}

export default App;
