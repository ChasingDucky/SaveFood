import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from '@mui/material';
import { AccessTime, LocationOn, QrCode2 } from '@mui/icons-material';
import { orderAPI } from '../services/api';
import { formatPrice, formatDateTime, getStatusText } from '../utils/format';

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        我的订单
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            暂无订单
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      订单号：{order._id.slice(-8).toUpperCase()}
                    </Typography>
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status)}
                    />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      {order.foodBag && (
                        <>
                          <Typography variant="h6" gutterBottom>
                            {order.foodBag.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {order.foodBag.description}
                          </Typography>
                        </>
                      )}

                      {order.merchant && (
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {order.merchant.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                            {order.merchant.address?.street}, {order.merchant.address?.city}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          取货时间：{order.pickupTime?.start} - {order.pickupTime?.end}
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.secondary">
                        下单时间：{formatDateTime(order.createdAt)}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                          {formatPrice(order.totalPrice)}
                        </Typography>

                        {(order.status === 'confirmed' || order.status === 'ready') && (
                          <Box
                            sx={{
                              bgcolor: 'grey.100',
                              p: 2,
                              borderRadius: 2,
                              mb: 2,
                            }}
                          >
                            <QrCode2 fontSize="large" />
                            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                              {order.pickupCode}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              取货码
                            </Typography>
                          </Box>
                        )}

                        {order.status === 'pending' && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleCancelOrder(order._id)}
                            fullWidth
                          >
                            取消订单
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyOrders;
