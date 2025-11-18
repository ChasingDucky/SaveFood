import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link,
  Paper,
  Stack,
  Fade,
  Zoom,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Restaurant,
  ShoppingBag,
  LocalOffer,
  Phone,
  ChevronRight,
  Home,
  Eco,
  Check,
} from '@mui/icons-material';
import { foodBagAPI, orderAPI } from '../services/api';
import { formatPrice, formatTime } from '../utils/format';
import { isAuthenticated } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  if (!foodBag) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">食物包不存在</Alert>
      </Container>
    );
  }

  const discount = Math.round(
    ((foodBag.originalPrice - foodBag.discountedPrice) / foodBag.originalPrice) * 100
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* 面包屑导航 */}
        <Fade in timeout={400}>
          <Breadcrumbs
            separator={<ChevronRight fontSize="small" />}
            sx={{ mb: 3 }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Home sx={{ mr: 0.5, fontSize: 20 }} />
              首页
            </Link>
            <Link component={RouterLink} to="/foodbags" underline="hover" color="inherit">
              食物包
            </Link>
            <Typography color="text.primary">{foodBag.name}</Typography>
          </Breadcrumbs>
        </Fade>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* 左侧：图片 */}
          <Grid item xs={12} md={6}>
            <Zoom in timeout={600}>
              <Paper
                elevation={8}
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {/* 折扣标签 */}
                {discount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 2,
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                      color: 'white',
                      borderRadius: '12px',
                      px: 2,
                      py: 1,
                      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <LocalOffer sx={{ fontSize: 20 }} />
                    <Typography variant="h6" fontWeight="bold">
                      {discount}% OFF
                    </Typography>
                  </Box>
                )}

                <Box
                  component="img"
                  src={foodBag.images?.[0] || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'}
                  alt={foodBag.name}
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: 500 },
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                />
              </Paper>
            </Zoom>
          </Grid>

          {/* 右侧：详情 */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Box>
                {/* 状态和类别 */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={foodBag.category}
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                  {foodBag.status === 'available' && foodBag.quantity > 0 && (
                    <Chip
                      icon={<Check />}
                      label={`剩余 ${foodBag.quantity} 份`}
                      color="success"
                      variant="outlined"
                    />
                  )}
                  {foodBag.status === 'sold_out' && (
                    <Chip label="已售罄" color="error" />
                  )}
                </Stack>

                {/* 标题 */}
                <Typography
                  variant="h3"
                  gutterBottom
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(135deg, #2E3B2E 0%, #4CAF50 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {foodBag.name}
                </Typography>

                {/* 价格 */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 3,
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(129, 199, 132, 0.05) 100%)',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'primary.light',
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through', mb: 1 }}
                  >
                    原价：{formatPrice(foodBag.originalPrice)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {formatPrice(foodBag.discountedPrice)}
                    </Typography>
                    <Chip
                      icon={<Eco />}
                      label={`节省 ${formatPrice(foodBag.originalPrice - foodBag.discountedPrice)}`}
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Paper>

                <Divider sx={{ my: 3 }} />

                {/* 描述 */}
                <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {foodBag.description}
                </Typography>

                {/* 饮食信息 */}
                {foodBag.dietaryInfo && foodBag.dietaryInfo.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight={600} color="text.primary">
                      🥗 饮食信息
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {foodBag.dietaryInfo.map((info, index) => (
                        <Chip key={index} label={info} size="small" variant="outlined" color="primary" />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* 过敏原 */}
                {foodBag.allergens && foodBag.allergens.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom fontWeight={600} color="warning.main">
                      ⚠️ 过敏原
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {foodBag.allergens.map((allergen, index) => (
                        <Chip
                          key={index}
                          label={allergen}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* 取货时间 */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        取货时间
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {formatTime(foodBag.pickupTime?.start)} - {formatTime(foodBag.pickupTime?.end)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* 预订按钮 */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingBag />}
                  onClick={() => setOrderDialogOpen(true)}
                  disabled={foodBag.status !== 'available' || foodBag.quantity === 0}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                    },
                    '&:disabled': {
                      background: 'grey.300',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  {foodBag.status === 'available' && foodBag.quantity > 0
                    ? '立即预订'
                    : '已售罄'}
                </Button>
              </Box>
            </Fade>
          </Grid>
        </Grid>

        {/* 商家信息 */}
        {foodBag.merchant && (
          <Fade in timeout={1000}>
            <Card
              sx={{
                mt: 6,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  p: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Restaurant sx={{ mr: 2, fontSize: 32 }} />
                  商家信息
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {foodBag.merchant.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
                      {foodBag.merchant.description}
                    </Typography>
                    <Chip
                      label={foodBag.merchant.category}
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'start' }}>
                        <LocationOn sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            地址
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            {foodBag.merchant.address?.street}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {foodBag.merchant.address?.city} {foodBag.merchant.address?.district}
                          </Typography>
                        </Box>
                      </Box>
                      {foodBag.merchant.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'start' }}>
                          <Phone sx={{ mr: 2, color: 'primary.main', fontSize: 24 }} />
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                              联系电话
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {foodBag.merchant.phone}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* 确认订单对话框 */}
        <Dialog
          open={orderDialogOpen}
          onClose={() => setOrderDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingBag sx={{ mr: 1, color: 'primary.main' }} />
              确认预订
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ py: 3 }}>
            <Typography variant="body1" paragraph>
              确认预订 <strong>{foodBag.name}</strong>？
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                取货时间
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatTime(foodBag.pickupTime?.start)} - {formatTime(foodBag.pickupTime?.end)}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'primary.light',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                支付金额
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {formatPrice(foodBag.discountedPrice)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOrderDialogOpen(false)} size="large">
              取消
            </Button>
            <Button
              variant="contained"
              onClick={handleOrder}
              disabled={ordering}
              size="large"
              sx={{
                px: 4,
                background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                },
              }}
            >
              {ordering ? '预订中...' : '确认预订'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default FoodBagDetail;
