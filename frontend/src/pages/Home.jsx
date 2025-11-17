import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Restaurant,
  ShoppingBag,
  Eco,
  Savings,
  Public,
  Star,
  LocalFlorist,
  FavoriteBorder,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Eco fontSize="large" />,
      title: '减少浪费',
      description: '帮助商家减少食物浪费，让每一份食物都物尽其用',
      color: '#4CAF50',
    },
    {
      icon: <Savings fontSize="large" />,
      title: '实惠价格',
      description: '以超值优惠价格购买美味食物，为您的钱包省钱',
      color: '#FF9800',
    },
    {
      icon: <Restaurant fontSize="large" />,
      title: '精选商家',
      description: '众多优质餐厅、面包店、超市等待您的光临',
      color: '#EC407A',
    },
    {
      icon: <Public fontSize="large" />,
      title: '环保行动',
      description: '每次购买都是对地球的贡献，共建可持续未来',
      color: '#42A5F5',
    },
  ];

  const stats = [
    { number: '10,000+', label: '已拯救食物包', icon: <ShoppingBag /> },
    { number: '500+', label: '合作商家', icon: <Restaurant /> },
    { number: '50,000+', label: '活跃用户', icon: <FavoriteBorder /> },
    { number: '30吨', label: '减少碳排放', icon: <Eco /> },
  ];

  const testimonials = [
    {
      name: '张小姐',
      text: '每天下班都能买到便宜又好吃的面包，既省钱又环保！',
      rating: 5,
    },
    {
      name: '李先生',
      text: '作为商家，这个平台帮我们减少了很多浪费，也增加了收入。',
      rating: 5,
    },
    {
      name: '王女士',
      text: '界面很漂亮，操作简单，发现了好多附近的好店！',
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Section - 增强版 */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 50%, #66BB6A 100%)',
          color: 'white',
          py: { xs: 8, md: 14 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 80%, rgba(129, 199, 132, 0.3) 0%, transparent 50%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalFlorist sx={{ fontSize: 40, mr: 1, opacity: 0.9 }} />
                    <Typography variant="overline" sx={{ fontSize: '1rem', letterSpacing: 2 }}>
                      珍惜每一份食物
                    </Typography>
                  </Box>
                  <Typography
                    variant="h1"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      textShadow: '0 2px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    拯救美味
                    <br />
                    <Box component="span" sx={{ color: '#FFE082' }}>
                      从今天开始
                    </Box>
                  </Typography>
                  <Typography
                    variant="h5"
                    paragraph
                    sx={{
                      mb: 4,
                      opacity: 0.95,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    以优惠价格拯救美味食物，减少浪费，保护地球
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/foodbags')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          bgcolor: 'grey.100',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                        },
                      }}
                      startIcon={<ShoppingBag />}
                    >
                      开始探索
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/register')}
                      sx={{
                        borderColor: 'white',
                        borderWidth: 2,
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: 'white',
                          borderWidth: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      立即注册
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1200}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 300,
                      height: 300,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        animation: 'pulse 3s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': {
                            transform: 'scale(1)',
                            opacity: 0.5,
                          },
                          '50%': {
                            transform: 'scale(1.1)',
                            opacity: 0.3,
                          },
                        },
                      }}
                    />
                    <ShoppingBag sx={{ fontSize: 200, opacity: 0.3 }} />
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - 增强版 */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in timeout={800 + index * 200}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(129, 199, 132, 0.05) 100%)',
                    border: '2px solid',
                    borderColor: 'primary.light',
                    borderRadius: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: 'primary.main',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 4px 14px rgba(76, 175, 80, 0.4)',
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section - 增强版 */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #FAFAFA 0%, #E8F5E9 100%)',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              为什么选择 SaveFood
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}
            >
              我们致力于减少食物浪费，为您和地球创造价值
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in timeout={1000 + index * 150}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'visible',
                      background: 'white',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}99 100%)`,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: feature.color,
                        mx: 'auto',
                        mb: 3,
                        boxShadow: `0 8px 24px ${feature.color}40`,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section - 新增 */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom fontWeight="bold">
            用户怎么说
          </Typography>
          <Typography variant="h6" color="text.secondary">
            听听他们的使用体验
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={1200 + index * 200}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
                  }}
                >
                  <Stack direction="row" spacing={0.5} mb={2}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: '#FFB300', fontSize: 24 }} />
                    ))}
                  </Stack>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    {testimonial.name}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section - 增强版 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          color: 'white',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '40%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-30px)' },
            },
          },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Eco sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
          <Typography variant="h2" gutterBottom fontWeight="bold">
            准备好开始了吗？
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 5, opacity: 0.95, lineHeight: 1.6 }}>
            加入我们，一起为减少食物浪费做出贡献
            <br />
            每一份食物都值得被珍惜
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/foodbags')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'scale(1.05)',
                },
              }}
            >
              发现附近的食物
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                borderColor: 'white',
                borderWidth: 2,
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  borderColor: 'white',
                  borderWidth: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              成为商家
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
