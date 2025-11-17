import { Box, CircularProgress, Fade } from '@mui/material';
import { Restaurant } from '@mui/icons-material';

const LoadingSpinner = () => {
  return (
    <Fade in>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          gap: 3,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
          }}
        >
          <CircularProgress
            size={80}
            thickness={4}
            sx={{
              color: 'primary.main',
              animationDuration: '1.5s',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'bounce 1.5s ease-in-out infinite',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                },
                '50%': {
                  transform: 'translate(-50%, -50%) scale(1.1)',
                },
              },
            }}
          >
            <Restaurant sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;
