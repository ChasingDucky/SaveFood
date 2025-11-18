import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Avatar,
  Grid,
  Paper,
  Fade,
  InputAdornment,
  Divider,
  Chip,
} from '@mui/material';
import {
  AccountCircle,
  Person,
  Email,
  Phone,
  Edit,
  ShoppingBag,
  Eco,
  Star,
  Save,
} from '@mui/icons-material';
import { authAPI } from '../services/api';
import { setUser as setLocalUser } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (err) {
      setError('获取用户信息失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await authAPI.updateProfile(user);
      setLocalUser(response.data);
      setSuccess('个人信息更新成功');
    } catch (err) {
      setError(err.response?.data?.message || '更新失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      icon: <ShoppingBag sx={{ fontSize: 32 }} />,
      label: '订单数量',
      value: user.stats?.ordersCount || 0,
      color: '#4CAF50',
    },
    {
      icon: <Eco sx={{ fontSize: 32 }} />,
      label: '节约食物',
      value: `${user.stats?.savedMeals || 0} 份`,
      color: '#66BB6A',
    },
    {
      icon: <Star sx={{ fontSize: 32 }} />,
      label: '累计节省',
      value: `¥${user.stats?.totalSaved || 0}`,
      color: '#FF9800',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                个人中心
              </Typography>
              <Typography variant="body1" color="text.secondary">
                管理您的个人信息和账户设置
              </Typography>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3, borderRadius: 2 }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{ mb: 3, borderRadius: 2 }}
                onClose={() => setSuccess('')}
              >
                {success}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Left Column: Profile Info */}
              <Grid item xs={12} md={8}>
                <Fade in timeout={800}>
                  <Paper
                    elevation={8}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Profile Header with Gradient */}
                    <Box
                      sx={{
                        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'white',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          mb: 2,
                          bgcolor: 'white',
                          color: 'primary.main',
                          border: '4px solid white',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        }}
                      >
                        <AccountCircle sx={{ fontSize: 100 }} />
                      </Avatar>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {user.name}
                      </Typography>
                      <Chip
                        label={user.role === 'merchant' ? '商家账户' : '普通用户'}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          px: 2,
                        }}
                      />
                    </Box>

                    {/* Profile Form */}
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Edit sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight="bold">
                          编辑个人信息
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 3 }} />

                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="姓名"
                              name="name"
                              value={user.name || ''}
                              onChange={handleChange}
                              required
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="邮箱"
                              name="email"
                              type="email"
                              value={user.email || ''}
                              disabled
                              helperText="邮箱无法修改"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="手机号"
                              name="phone"
                              value={user.phone || ''}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Phone color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              disabled={saving}
                              fullWidth
                              startIcon={<Save />}
                              sx={{
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                                },
                                transition: 'all 0.3s',
                              }}
                            >
                              {saving ? '保存中...' : '保存修改'}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </CardContent>
                  </Paper>
                </Fade>
              </Grid>

              {/* Right Column: Stats Cards */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {stats.map((stat, index) => (
                    <Fade in timeout={1000 + index * 200} key={index}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          overflow: 'hidden',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                            p: 3,
                            color: 'white',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                p: 1.5,
                                display: 'flex',
                              }}
                            >
                              {stat.icon}
                            </Box>
                          </Box>
                          <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Card>
                    </Fade>
                  ))}

                  {/* Additional Info Card */}
                  <Fade in timeout={1600}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Eco sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            环保贡献
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          通过使用 SaveFood，您已经为环保事业做出了贡献！
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          继续购买食物包，拯救更多美味，减少浪费。
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Profile;
