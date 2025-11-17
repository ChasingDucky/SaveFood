import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Stack,
  Avatar,
  Fade,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  LocalOffer,
} from '@mui/icons-material';
import { formatPrice } from '../utils/format';

const FoodBagCard = ({ foodBag, index = 0 }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === 'sold_out') return 'error';
    if (status === 'reserved') return 'warning';
    return 'success';
  };

  const getStatusText = (status, quantity) => {
    if (status === 'sold_out') return '已售罄';
    if (quantity > 0) return `剩余 ${quantity}`;
    return '可预订';
  };

  const discount = Math.round(
    ((foodBag.originalPrice - foodBag.discountedPrice) / foodBag.originalPrice) * 100
  );

  return (
    <Fade in timeout={300 + index * 100}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <CardActionArea
          onClick={() => navigate(`/foodbags/${foodBag._id}`)}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
        >
          {/* 折扣标签 */}
          {discount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                color: 'white',
                borderRadius: '12px',
                px: 1.5,
                py: 0.5,
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <LocalOffer sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight="bold">
                {discount}% OFF
              </Typography>
            </Box>
          )}

          {/* 图片 */}
          <Box sx={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={foodBag.images?.[0] || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'}
              alt={foodBag.name}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                p: 1.5,
              }}
            >
              <Chip
                label={foodBag.category}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>

          {/* 内容 */}
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            {/* 标题 */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '3.6em',
                lineHeight: 1.4,
              }}
            >
              {foodBag.name}
            </Typography>

            {/* 商家信息 */}
            {foodBag.merchant && (
              <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {foodBag.merchant.name}
                </Typography>
              </Stack>
            )}

            {/* 描述 */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '2.8em',
                lineHeight: 1.4,
              }}
            >
              {foodBag.description}
            </Typography>

            {/* 价格和时间 */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 'auto',
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through', display: 'block', mb: 0.5 }}
                >
                  {formatPrice(foodBag.originalPrice)}
                </Typography>
                <Typography
                  variant="h5"
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

              <Chip
                icon={<AccessTime sx={{ fontSize: 16 }} />}
                label={`${foodBag.pickupTime?.start || ''}`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'primary.light',
                  color: 'primary.main',
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* 状态标签 */}
            <Box sx={{ mt: 2 }}>
              <Chip
                label={getStatusText(foodBag.status, foodBag.quantity)}
                size="small"
                color={getStatusColor(foodBag.status)}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
};

export default FoodBagCard;
