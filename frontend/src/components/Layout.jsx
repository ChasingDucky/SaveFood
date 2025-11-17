import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  AccountCircle,
  ShoppingBag,
  Store,
} from '@mui/icons-material';
import { useState } from 'react';
import { isAuthenticated, getUser, logout } from '../utils/auth';

const Layout = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const user = getUser();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
          <RestaurantIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            SaveFood
          </Typography>

          <Button color="inherit" component={Link} to="/foodbags">
            发现食物
          </Button>

          {isAuthenticated() ? (
            <>
              <IconButton
                color="inherit"
                component={Link}
                to="/orders"
                sx={{ ml: 1 }}
              >
                <ShoppingBag />
              </IconButton>

              {(user?.role === 'merchant' || user?.role === 'admin') && (
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/merchant/dashboard"
                  sx={{ ml: 1 }}
                >
                  <Store />
                </IconButton>
              )}

              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                  个人中心
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                  我的订单
                </MenuItem>
                <MenuItem onClick={handleLogout}>退出登录</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                登录
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/register"
                sx={{ ml: 1 }}
              >
                注册
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 SaveFood. 珍惜食物，减少浪费，共创美好未来。
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
