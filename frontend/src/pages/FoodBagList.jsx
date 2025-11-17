import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fade,
  Stack,
  Chip,
} from '@mui/material';
import { Search, FilterList, RestaurantOutlined } from '@mui/icons-material';
import { foodBagAPI } from '../services/api';
import FoodBagCard from '../components/FoodBagCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const FoodBagList = () => {
  const navigate = useNavigate();
  const [foodBags, setFoodBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { value: '', label: '全部分类' },
    { value: '面包糕点', label: '🥖 面包糕点' },
    { value: '餐食', label: '🍱 餐食' },
    { value: '蔬菜水果', label: '🥗 蔬菜水果' },
    { value: '乳制品', label: '🥛 乳制品' },
    { value: '熟食', label: '🍗 熟食' },
    { value: '混合', label: '🎁 混合' },
  ];

  useEffect(() => {
    fetchFoodBags();
  }, [category]);

  const fetchFoodBags = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (category) params.category = category;

      const response = await foodBagAPI.getAll(params);
      setFoodBags(response.data);
    } catch (err) {
      setError('获取食物包列表失败，请稍后重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoodBags = foodBags.filter((bag) =>
    bag.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={600}>
            <Box>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #2E3B2E 0%, #4CAF50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                发现美味食物
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                以优惠价格拯救临期美食，减少浪费，保护地球
              </Typography>

              {/* Search and Filter */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="搜索食物包名称..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: 'white',
                      '& .MuiOutlinedInput-root': {
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth sx={{ bgcolor: 'white' }}>
                    <InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterList fontSize="small" />
                        分类筛选
                      </Box>
                    </InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="分类筛选"
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        {/* Results Info */}
        {!loading && filteredFoodBags.length > 0 && (
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              找到 <strong>{filteredFoodBags.length}</strong> 个食物包
            </Typography>
            {category && (
              <Chip
                label={categories.find(c => c.value === category)?.label || category}
                onDelete={() => setCategory('')}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        )}

        {/* Food Bags Grid */}
        {filteredFoodBags.length > 0 ? (
          <Grid container spacing={3}>
            {filteredFoodBags.map((bag, index) => (
              <Grid item xs={12} sm={6} md={4} key={bag._id}>
                <FoodBagCard foodBag={bag} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState
            icon={RestaurantOutlined}
            title={search ? '未找到相关食物包' : '暂无可用的食物包'}
            description={
              search
                ? `没有找到包含 "${search}" 的食物包，试试其他关键词吧`
                : '当前没有可用的食物包，请稍后再来看看'
            }
            actionLabel={search ? '清除搜索' : '浏览所有分类'}
            onAction={() => {
              if (search) {
                setSearch('');
              } else {
                setCategory('');
              }
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default FoodBagList;
