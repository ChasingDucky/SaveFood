import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  Grid,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Restaurant,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  LocalFlorist,
} from '@mui/icons-material';
import { authAPI } from '../services/api';
import { setAuthToken, setUser } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { token, ...user } = response.data;

      setAuthToken(token);
      setUser(user);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 50%, #E8F5E9 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Info */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Box sx={{ pr: { md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocalFlorist sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #2E3B2E 0%, #4CAF50 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    SaveFood
                  </Typography>
                </Box>

                <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
                  欢迎回来！
                </Typography>

                <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                  继续您的环保之旅，拯救更多美味食物
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    '🌱 减少食物浪费',
                    '💰 享受超值优惠',
                    '🌍 保护地球环境',
                    '🤝 支持本地商家',
                  ].map((text, index) => (
                    <Fade key={index} in timeout={1000 + index * 200}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          bgcolor: 'white',
                          borderRadius: 2,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <Typography variant="h6">{text}</Typography>
                      </Box>
                    </Fade>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1200}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'white',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    <Restaurant sx={{ fontSize: 48, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    登录账户
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    登录后即可开始探索美味食物
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="邮箱地址"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="密码"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 4, mb: 2, py: 1.5 }}
                  >
                    {loading ? '登录中...' : '登录'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      还没有账号？{' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        underline="hover"
                        fontWeight="bold"
                        color="primary"
                      >
                        立即注册
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
