import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Fade,
  Alert,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Store,
  Fastfood,
  Receipt,
  TrendingUp,
  ShoppingBag,
  AttachMoney,
  Eco,
  Add,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  Schedule,
  Search,
  LocalShipping,
} from '@mui/icons-material';
import { merchantAPI, foodBagAPI, orderAPI } from '../services/api';
import { formatPrice, formatDateTime, getStatusText } from '../utils/format';
import LoadingSpinner from '../components/LoadingSpinner';

const MerchantDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalFoodBags: 0,
    savedMeals: 0,
  });
  const [merchantInfo, setMerchantInfo] = useState(null);
  const [foodBags, setFoodBags] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFoodBag, setEditingFoodBag] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // 这里应该调用实际的 API
      // 暂时使用模拟数据
      setStats({
        totalRevenue: 5280,
        totalOrders: 42,
        totalFoodBags: 8,
        savedMeals: 42,
      });
      setMerchantInfo({
        name: '幸福面包坊',
        category: '面包店',
        phone: '021-12345678',
        address: '人民路123号',
      });
    } catch (err) {
      setError('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const statCards = [
    {
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      label: '总收入',
      value: `¥${stats.totalRevenue}`,
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
    },
    {
      icon: <Receipt sx={{ fontSize: 40 }} />,
      label: '总订单',
      value: stats.totalOrders,
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
    },
    {
      icon: <Fastfood sx={{ fontSize: 40 }} />,
      label: '食物包',
      value: stats.totalFoodBags,
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
    },
    {
      icon: <Eco sx={{ fontSize: 40 }} />,
      label: '减少浪费',
      value: `${stats.savedMeals} 份`,
      color: '#66BB6A',
      gradient: 'linear-gradient(135deg, #66BB6A 0%, #81C784 100%)',
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
      <Container maxWidth="xl">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Store sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
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
                  商家管理后台
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                管理您的商家信息、食物包和订单
              </Typography>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
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

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {statCards.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Fade in timeout={800 + index * 100}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          background: stat.gradient,
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
                          <TrendingUp sx={{ opacity: 0.5 }} />
                        </Box>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {/* Tabs */}
            <Paper
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      color: 'white',
                      fontWeight: 600,
                      '&.Mui-selected': {
                        color: 'white',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'white',
                      height: 3,
                    },
                  }}
                >
                  <Tab icon={<Store />} label="商家信息" iconPosition="start" />
                  <Tab icon={<Fastfood />} label="食物包管理" iconPosition="start" />
                  <Tab icon={<Receipt />} label="订单管理" iconPosition="start" />
                </Tabs>
              </Box>

              <Box sx={{ p: 4 }}>
                {/* Tab 0: 商家信息 */}
                {tabValue === 0 && merchantInfo && (
                  <Fade in timeout={400}>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 3,
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          商家信息
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<Edit />}
                          sx={{
                            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                            },
                          }}
                        >
                          编辑信息
                        </Button>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="商家名称"
                            value={merchantInfo.name}
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="商家类别"
                            value={merchantInfo.category}
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="联系电话"
                            value={merchantInfo.phone}
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="商家地址"
                            value={merchantInfo.address}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>

                      <Box
                        sx={{
                          mt: 4,
                          p: 3,
                          background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
                          borderRadius: 2,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Eco sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            环保成就
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          您的商家已经帮助减少了 <strong>{stats.savedMeals} 份</strong>{' '}
                          食物浪费，为环保事业做出了重要贡献！
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                )}

                {/* Tab 1: 食物包管理 */}
                {tabValue === 1 && (
                  <Fade in timeout={400}>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 3,
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          食物包管理
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() => setOpenDialog(true)}
                          sx={{
                            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                            },
                          }}
                        >
                          创建食物包
                        </Button>
                      </Box>

                      <TextField
                        fullWidth
                        placeholder="搜索食物包..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3, borderRadius: 2 }}
                      />

                      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                              <TableCell>
                                <strong>名称</strong>
                              </TableCell>
                              <TableCell>
                                <strong>原价</strong>
                              </TableCell>
                              <TableCell>
                                <strong>折扣价</strong>
                              </TableCell>
                              <TableCell>
                                <strong>库存</strong>
                              </TableCell>
                              <TableCell>
                                <strong>状态</strong>
                              </TableCell>
                              <TableCell align="right">
                                <strong>操作</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                <Fastfood sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                  暂无食物包，点击"创建食物包"开始发布
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Fade>
                )}

                {/* Tab 2: 订单管理 */}
                {tabValue === 2 && (
                  <Fade in timeout={400}>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 3,
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          订单管理
                        </Typography>
                        <FormControl sx={{ minWidth: 200 }}>
                          <InputLabel>订单状态</InputLabel>
                          <Select label="订单状态" defaultValue="all">
                            <MenuItem value="all">全部订单</MenuItem>
                            <MenuItem value="pending">待确认</MenuItem>
                            <MenuItem value="confirmed">已确认</MenuItem>
                            <MenuItem value="ready">准备中</MenuItem>
                            <MenuItem value="completed">已完成</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                              <TableCell>
                                <strong>订单号</strong>
                              </TableCell>
                              <TableCell>
                                <strong>食物包</strong>
                              </TableCell>
                              <TableCell>
                                <strong>数量</strong>
                              </TableCell>
                              <TableCell>
                                <strong>金额</strong>
                              </TableCell>
                              <TableCell>
                                <strong>状态</strong>
                              </TableCell>
                              <TableCell>
                                <strong>取货时间</strong>
                              </TableCell>
                              <TableCell align="right">
                                <strong>操作</strong>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                <Receipt sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                                <Typography variant="body1" color="text.secondary">
                                  暂无订单
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Fade>
                )}
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>

      {/* Create/Edit Food Bag Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Add sx={{ mr: 1 }} />
            创建食物包
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="食物包名称" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="描述" multiline rows={3} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="原价" type="number" required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="折扣价" type="number" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="库存数量" type="number" required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>取消</Button>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
              },
            }}
          >
            创建
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MerchantDashboard;
