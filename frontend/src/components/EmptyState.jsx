import { Box, Typography, Button } from '@mui/material';
import { SearchOff, ShoppingBagOutlined, RestaurantOutlined } from '@mui/icons-material';

const EmptyState = ({
  icon: Icon = SearchOff,
  title = '暂无数据',
  description = '当前没有找到相关内容',
  actionLabel,
  onAction
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
        }}
      >
        <Icon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.6 }} />
      </Box>

      <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {description}
      </Typography>

      {actionLabel && onAction && (
        <Button
          variant="contained"
          size="large"
          onClick={onAction}
          sx={{ px: 4 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
