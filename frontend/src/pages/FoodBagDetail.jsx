import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Restaurant,
  ShoppingBag,
} from '@mui/icons-material';
import { foodBagAPI, orderAPI } from '../services/api';
import { formatPrice, formatTime } from '../utils/format';
import { isAuthenticated } from '../utils/auth';

const FoodBagDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodBag, setFoodBag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetchFoodBag();
  }, [id]);

  const fetchFoodBag = async () => {
    try {
      setLoading(true);
      const response = await foodBagAPI.getById(id);
      setFoodBag(response.data);
    } catch (err) {
      setError('获取食物包详情失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setOrdering(true);
    try {
      await orderAPI.create({
        foodBagId: foodBag._id,
        quantity: 1,
      });
      setOrderDialogOpen(false);
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || '预订失败，请重试');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!foodBag) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">食物包不存在</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={foodBag.images?.[0] || 'https://via.placeholder.com/600x400?text=Food'}
            alt={foodBag.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Chip label={foodBag.category} color="primary" sx={{ mr: 1 }} />
            {foodBag.status === 'available' && foodBag.quantity > 0 && (
              <Chip label={`剩余 ${foodBag.quantity} 份`} color="success" />
            )}
            {foodBag.status === 'sold_out' && (
              <Chip label="已售罄" color="error" />
            )}
          </Box>

          <Typography variant="h3" gutterBottom fontWeight="bold">
            {foodBag.name}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textDecoration: 'line-through', mb: 1 }}
            >
              原价：{formatPrice(foodBag.originalPrice)}
            </Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {formatPrice(foodBag.discountedPrice)}
            </Typography>
            <Typography variant="caption" color="success.main">
              节省 {formatPrice(foodBag.originalPrice - foodBag.discountedPrice)}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph>
            {foodBag.description}
          </Typography>

          {foodBag.dietaryInfo && foodBag.dietaryInfo.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                饮食信息：
              </Typography>
              {foodBag.dietaryInfo.map((info, index) => (
                <Chip key={index} label={info} size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}

          {foodBag.allergens && foodBag.allergens.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                过敏原：
              </Typography>
              {foodBag.allergens.map((allergen, index) => (
                <Chip
                  key={index}
                  label={allergen}
                  size="small"
                  color="warning"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                取货时间：{formatTime(foodBag.pickupTime?.start)} - {formatTime(foodBag.pickupTime?.end)}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingBag />}
            onClick={() => setOrderDialogOpen(true)}
            disabled={foodBag.status !== 'available' || foodBag.quantity === 0}
            sx={{ mt: 3 }}
          >
            {foodBag.status === 'available' && foodBag.quantity > 0
              ? '立即预订'
              : '已售罄'}
          </Button>
        </Grid>
      </Grid>

      {/* 商家信息 */}
      {foodBag.merchant && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              <Restaurant sx={{ verticalAlign: 'middle', mr: 1 }} />
              商家信息
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">{foodBag.merchant.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {foodBag.merchant.description}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'start', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="body2">
                      {foodBag.merchant.address?.street}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {foodBag.merchant.address?.city}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* 确认订单对话框 */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}>
        <DialogTitle>确认预订</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            确认预订 <strong>{foodBag.name}</strong>？
          </Typography>
          <Typography variant="body2" color="text.secondary">
            取货时间：{formatTime(foodBag.pickupTime?.start)} - {formatTime(foodBag.pickupTime?.end)}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            总计：{formatPrice(foodBag.discountedPrice)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>取消</Button>
          <Button
            variant="contained"
            onClick={handleOrder}
            disabled={ordering}
          >
            {ordering ? '预订中...' : '确认预订'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FoodBagDetail;
