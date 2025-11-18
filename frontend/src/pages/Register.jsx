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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Fade,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import {
  Restaurant,
  Eco,
  Savings,
  Store,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock,
} from '@mui/icons-material';
import { authAPI } from '../services/api';
import { setAuthToken, setUser } from '../utils/auth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      const { token, ...user } = response.data;

      setAuthToken(token);
      setUser(user);

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Eco />, text: '环保行动', color: '#4CAF50' },
    { icon: <Savings />, text: '超值优惠', color: '#FF9800' },
    { icon: <Store />, text: '精选商家', color: '#EC407A' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* 左侧：品牌信息 */}
          <Grid item xs={12} md={5}>
            <Fade in timeout={800}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Restaurant sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    SaveFood
                  </Typography>
                </Box>

                <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
                  开启您的环保之旅
                </Typography>

                <Typography variant="h6" paragraph color="text.secondary" sx={{ mb: 4 }}>
                  加入我们，一起拯救美味，减少浪费
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {features.map((feature, index) => (
                    <Fade in timeout={1000 + index * 200} key={index}>
                      <Card
                        sx={{
                          background: 'white',
                          borderLeft: `4px solid ${feature.color}`,
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateX(8px)',
                          },
                        }}
                      >
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box
                            sx={{
                              bgcolor: `${feature.color}15`,
                              color: feature.color,
                              borderRadius: '50%',
                              p: 1.5,
                              display: 'flex',
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography variant="h6" fontWeight={600}>
                            {feature.text}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Fade>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* 右侧：注册表单 */}
          <Grid item xs={12} md={7}>
            <Fade in timeout={600}>
              <Paper
                elevation={8}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  background: 'white',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  创建账号
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  填写以下信息开始使用 SaveFood
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="姓名"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="手机号"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="邮箱"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>用户类型</InputLabel>
                        <Select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          label="用户类型"
                          startAdornment={
                            <InputAdornment position="start">
                              {formData.role === 'merchant' ? (
                                <Store color="action" />
                              ) : (
                                <Person color="action" />
                              )}
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="user">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Person fontSize="small" />
                              普通用户 - 购买食物包
                            </Box>
                          </MenuItem>
                          <MenuItem value="merchant">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Store fontSize="small" />
                              商家 - 发布食物包
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="密码"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="确认密码"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 4,
                      mb: 2,
                      py: 1.5,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    {loading ? '注册中...' : '立即注册'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      已有账号？{' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        underline="hover"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          '&:hover': { color: 'primary.dark' },
                        }}
                      >
                        立即登录
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

export default Register;
