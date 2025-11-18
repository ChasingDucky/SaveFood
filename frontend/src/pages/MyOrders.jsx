import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  Button,
  Divider,
  Paper,
  Fade,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  AccessTime,
  LocationOn,
  QrCode2,
  ShoppingBag,
  Store,
  CheckCircle,
  Cancel,
  Schedule,
  LocalShipping,
} from '@mui/icons-material';
import { orderAPI } from '../services/api';
import { formatPrice, formatDateTime, getStatusText } from '../utils/format';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
    } catch (err) {
      setError('获取订单列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('确定要取消此订单吗？')) return;

    try {
      await orderAPI.cancel(orderId);
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || '取消订单失败');
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: 'warning',
      confirmed: 'info',
      ready: 'success',
      completed: 'default',
      cancelled: 'error',
    };
    return colorMap[status] || 'default';
  };

  const getStatusGradient = (status) => {
    const gradientMap = {
      pending: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      confirmed: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      ready: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
      completed: 'linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 100%)',
      cancelled: 'linear-gradient(135deg, #F44336 0%, #E57373 100%)',
    };
    return gradientMap[status] || gradientMap.pending;
  };

  const getOrderSteps = (status) => {
    const allSteps = [
      { label: '订单确认', status: 'confirmed' },
      { label: '准备中', status: 'ready' },
      { label: '已完成', status: 'completed' },
    ];

    const statusOrder = ['pending', 'confirmed', 'ready', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    return { steps: allSteps, activeStep: currentIndex };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingBag sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
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
                  我的订单
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                查看您的购买记录和取货信息
              </Typography>
            </Box>

            {/* Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3, borderRadius: 2 }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {/* Empty State */}
            {orders.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag sx={{ fontSize: 100 }} />}
                title="暂无订单"
                description="您还没有任何订单，快去发现美味食物包吧！"
                actionText="浏览食物包"
                actionLink="/food-bags"
              />
            ) : (
              <Grid container spacing={3}>
                {orders.map((order, index) => {
                  const { steps, activeStep } = getOrderSteps(order.status);

                  return (
                    <Grid item xs={12} key={order._id}>
                      <Fade in timeout={800 + index * 100}>
                        <Paper
                          elevation={8}
                          sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                            },
                          }}
                        >
                          {/* Order Header with Gradient */}
                          <Box
                            sx={{
                              background: getStatusGradient(order.status),
                              p: 2,
                              color: 'white',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ShoppingBag sx={{ mr: 1 }} />
                              <Typography variant="h6" fontWeight="bold">
                                订单号：{order._id.slice(-8).toUpperCase()}
                              </Typography>
                            </Box>
                            <Chip
                              label={getStatusText(order.status)}
                              sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 'bold',
                              }}
                            />
                          </Box>

                          <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                              {/* Left: Food Bag Details */}
                              <Grid item xs={12} md={3}>
                                {order.foodBag?.images?.[0] && (
                                  <CardMedia
                                    component="img"
                                    image={order.foodBag.images[0]}
                                    alt={order.foodBag.name}
                                    sx={{
                                      borderRadius: 2,
                                      height: 180,
                                      objectFit: 'cover',
                                      mb: 2,
                                    }}
                                  />
                                )}
                              </Grid>

                              <Grid item xs={12} md={5}>
                                {order.foodBag && (
                                  <>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                      {order.foodBag.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      paragraph
                                      sx={{ mb: 2 }}
                                    >
                                      {order.foodBag.description}
                                    </Typography>
                                  </>
                                )}

                                {/* Merchant Info */}
                                {order.merchant && (
                                  <Box
                                    sx={{
                                      bgcolor: 'grey.50',
                                      p: 2,
                                      borderRadius: 2,
                                      mb: 2,
                                    }}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                      <Store
                                        fontSize="small"
                                        sx={{ mr: 1, color: 'primary.main' }}
                                      />
                                      <Typography variant="subtitle2" fontWeight="bold">
                                        {order.merchant.name}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                                      <LocationOn
                                        fontSize="small"
                                        sx={{ mr: 0.5, color: 'text.secondary', fontSize: 16 }}
                                      />
                                      <Typography variant="caption" color="text.secondary">
                                        {order.merchant.address?.street},{' '}
                                        {order.merchant.address?.city}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}

                                {/* Pickup Time */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <AccessTime
                                    fontSize="small"
                                    sx={{ mr: 1, color: 'primary.main' }}
                                  />
                                  <Typography variant="body2" fontWeight={600}>
                                    取货时间：{order.pickupTime?.start} - {order.pickupTime?.end}
                                  </Typography>
                                </Box>

                                <Typography variant="caption" color="text.secondary">
                                  下单时间：{formatDateTime(order.createdAt)}
                                </Typography>

                                {/* Order Status Stepper */}
                                {order.status !== 'cancelled' && (
                                  <Box sx={{ mt: 3 }}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                      {steps.map((step) => (
                                        <Step key={step.label}>
                                          <StepLabel>{step.label}</StepLabel>
                                        </Step>
                                      ))}
                                    </Stepper>
                                  </Box>
                                )}
                              </Grid>

                              {/* Right: Price & Pickup Code */}
                              <Grid item xs={12} md={4}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  {/* Price */}
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                      gutterBottom
                                    >
                                      订单金额
                                    </Typography>
                                    <Typography
                                      variant="h4"
                                      fontWeight="bold"
                                      gutterBottom
                                      sx={{
                                        background:
                                          'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                      }}
                                    >
                                      {formatPrice(order.totalPrice)}
                                    </Typography>
                                  </Box>

                                  {/* Pickup Code */}
                                  {(order.status === 'confirmed' || order.status === 'ready') && (
                                    <Box
                                      sx={{
                                        background:
                                          'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                                        p: 3,
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        color: 'white',
                                        boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
                                      }}
                                    >
                                      <QrCode2 sx={{ fontSize: 48, mb: 1 }} />
                                      <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                                        {order.pickupCode}
                                      </Typography>
                                      <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                        取货码
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        sx={{ mt: 1, opacity: 0.8 }}
                                      >
                                        向商家出示此取货码
                                      </Typography>
                                    </Box>
                                  )}

                                  {/* Cancel Button */}
                                  {order.status === 'pending' && (
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      size="large"
                                      onClick={() => handleCancelOrder(order._id)}
                                      fullWidth
                                      startIcon={<Cancel />}
                                      sx={{
                                        borderRadius: 2,
                                        py: 1.5,
                                        '&:hover': {
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                                        },
                                        transition: 'all 0.3s',
                                      }}
                                    >
                                      取消订单
                                    </Button>
                                  )}

                                  {/* Completed Badge */}
                                  {order.status === 'completed' && (
                                    <Box
                                      sx={{
                                        bgcolor: 'grey.100',
                                        p: 2,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <CheckCircle
                                        sx={{ fontSize: 48, color: 'success.main', mb: 1 }}
                                      />
                                      <Typography variant="body2" color="text.secondary">
                                        订单已完成
                                      </Typography>
                                    </Box>
                                  )}
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Paper>
                      </Fade>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default MyOrders;
