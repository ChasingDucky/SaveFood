import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FoodBagList from './pages/FoodBagList';
import FoodBagDetail from './pages/FoodBagDetail';
import MyOrders from './pages/MyOrders';
import MerchantDashboard from './pages/MerchantDashboard';
import Profile from './pages/Profile';
import { isAuthenticated, getUser } from './utils/auth';

// 私有路由组件
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// 商家路由组件
const MerchantRoute = ({ children }) => {
  const user = getUser();
  return isAuthenticated() && (user?.role === 'merchant' || user?.role === 'admin')
    ? children
    : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="foodbags" element={<FoodBagList />} />
            <Route path="foodbags/:id" element={<FoodBagDetail />} />
            <Route
              path="orders"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="merchant/dashboard"
              element={
                <MerchantRoute>
                  <MerchantDashboard />
                </MerchantRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
