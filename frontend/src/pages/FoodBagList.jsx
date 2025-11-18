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
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import {
  Search,
  FilterList,
  RestaurantOutlined,
  Sort,
  TrendingDown,
  AttachMoney,
  LocalOffer,
  Eco,
  FilterAlt,
  Clear,
} from '@mui/icons-material';
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
  const [sortBy, setSortBy] = useState('default');
  const [dietaryFilter, setDietaryFilter] = useState([]);

  const categories = [
    { value: '', label: '全部分类' },
    { value: '面包糕点', label: '🥖 面包糕点' },
    { value: '餐食', label: '🍱 餐食' },
    { value: '蔬菜水果', label: '🥗 蔬菜水果' },
    { value: '乳制品', label: '🥛 乳制品' },
    { value: '熟食', label: '🍗 熟食' },
    { value: '混合', label: '🎁 混合' },
  ];

  const sortOptions = [
    { value: 'default', label: '默认排序', icon: <Sort /> },
    { value: 'price-low', label: '价格从低到高', icon: <AttachMoney /> },
    { value: 'price-high', label: '价格从高到低', icon: <TrendingDown /> },
    { value: 'discount', label: '折扣最大', icon: <LocalOffer /> },
  ];

  const dietaryOptions = ['素食友好', '低脂', '无糖', '高蛋白', '无麸质'];

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

  const handleDietaryToggle = (option) => {
    setDietaryFilter((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setSortBy('default');
    setDietaryFilter([]);
  };

  // Filter and sort food bags
  let filteredFoodBags = foodBags
    .filter((bag) => bag.name.toLowerCase().includes(search.toLowerCase()))
    .filter((bag) => {
      if (dietaryFilter.length === 0) return true;
      return dietaryFilter.every((diet) => bag.dietaryInfo?.includes(diet));
    });

  // Sort food bags
  if (sortBy === 'price-low') {
    filteredFoodBags.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sortBy === 'price-high') {
    filteredFoodBags.sort((a, b) => b.discountedPrice - a.discountedPrice);
  } else if (sortBy === 'discount') {
    filteredFoodBags.sort((a, b) => {
      const discountA = ((a.originalPrice - a.discountedPrice) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.discountedPrice) / b.originalPrice) * 100;
      return discountB - discountA;
    });
  }

  const activeFiltersCount =
    (category ? 1 : 0) + (search ? 1 : 0) + dietaryFilter.length + (sortBy !== 'default' ? 1 : 0);

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
                <Grid item xs={12} md={6}>
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
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 2 }}>
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
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 2 }}>
                    <InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Sort fontSize="small" />
                        排序方式
                      </Box>
                    </InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="排序方式">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {option.icon}
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Dietary Filters */}
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Eco sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight={600}>
                    饮食偏好
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {dietaryOptions.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      onClick={() => handleDietaryToggle(option)}
                      color={dietaryFilter.includes(option) ? 'primary' : 'default'}
                      variant={dietaryFilter.includes(option) ? 'filled' : 'outlined'}
                      sx={{
                        mb: 1,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
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

        {/* Active Filters and Results Info */}
        {!loading && (
          <Paper
            elevation={2}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {/* Results Count */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  找到 {filteredFoodBags.length} 个食物包
                </Typography>
                {activeFiltersCount > 0 && (
                  <Chip
                    icon={<FilterAlt />}
                    label={`${activeFiltersCount} 个筛选条件`}
                    color="primary"
                    size="small"
                  />
                )}
              </Box>

              {/* Clear Filters Button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleClearFilters}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  清除所有筛选
                </Button>
              )}
            </Box>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <Box sx={{ mt: 2 }}>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {category && (
                    <Chip
                      label={`分类: ${categories.find((c) => c.value === category)?.label || category}`}
                      onDelete={() => setCategory('')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {search && (
                    <Chip
                      label={`搜索: ${search}`}
                      onDelete={() => setSearch('')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {sortBy !== 'default' && (
                    <Chip
                      label={`排序: ${sortOptions.find((s) => s.value === sortBy)?.label}`}
                      onDelete={() => setSortBy('default')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {dietaryFilter.map((diet) => (
                    <Chip
                      key={diet}
                      label={`饮食: ${diet}`}
                      onDelete={() => handleDietaryToggle(diet)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
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
