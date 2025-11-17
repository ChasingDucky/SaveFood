import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';
import { foodBagAPI } from '../services/api';
import { formatPrice, getStatusText } from '../utils/format';

const FoodBagList = () => {
  const navigate = useNavigate();
  const [foodBags, setFoodBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchFoodBags();
  }, [category]);

  const fetchFoodBags = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category) params.category = category;

      const response = await foodBagAPI.getAll(params);
      setFoodBags(response.data);
    } catch (err) {
      setError('获取食物包列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoodBags = foodBags.filter((bag) =>
    bag.name.toLowerCase().includes(search.toLowerCase())
  );

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
        发现美味食物
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        以优惠价格拯救临期美食，减少浪费
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* 搜索和筛选 */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="搜索食物包..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>分类</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="分类"
              >
                <MenuItem value="">全部</MenuItem>
                <MenuItem value="面包糕点">面包糕点</MenuItem>
                <MenuItem value="餐食">餐食</MenuItem>
                <MenuItem value="蔬菜水果">蔬菜水果</MenuItem>
                <MenuItem value="乳制品">乳制品</MenuItem>
                <MenuItem value="熟食">熟食</MenuItem>
                <MenuItem value="混合">混合</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* 食物包列表 */}
      <Grid container spacing={3}>
        {filteredFoodBags.map((bag) => (
          <Grid item xs={12} sm={6} md={4} key={bag._id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/foodbags/${bag._id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={bag.images?.[0] || 'https://via.placeholder.com/400x200?text=Food'}
                  alt={bag.name}
                />
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Chip
                      label={bag.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {bag.status === 'available' && bag.quantity > 0 && (
                      <Chip
                        label={`剩余 ${bag.quantity}`}
                        size="small"
                        color="success"
                        sx={{ ml: 1 }}
                      />
                    )}
                    {bag.status === 'sold_out' && (
                      <Chip
                        label="已售罄"
                        size="small"
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>

                  <Typography variant="h6" gutterBottom noWrap>
                    {bag.name}
                  </Typography>

                  {bag.merchant && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {bag.merchant.name}
                      </Typography>
                    </Box>
                  )}

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
                    }}
                  >
                    {bag.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {formatPrice(bag.originalPrice)}
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        {formatPrice(bag.discountedPrice)}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {bag.pickupTime?.start} - {bag.pickupTime?.end}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredFoodBags.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            暂无可用的食物包
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default FoodBagList;
