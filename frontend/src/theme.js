import { createTheme } from '@mui/material/styles';

// 莫奈取色 - 灵感来自莫奈的《睡莲》系列
// 使用柔和的蓝绿色调和温暖的互补色
const monetColors = {
  // 主色调 - 睡莲池的蓝绿色
  primary: {
    light: '#81C784',    // 柔和的绿色
    main: '#4CAF50',     // 主绿色 - 象征新鲜和环保
    dark: '#388E3C',     // 深绿色
    contrastText: '#fff',
  },
  // 辅助色 - 莫奈画作中的粉紫色调
  secondary: {
    light: '#FFB74D',    // 温暖的橙色
    main: '#FF9800',     // 主橙色 - 象征温暖和美食
    dark: '#F57C00',     // 深橙色
    contrastText: '#fff',
  },
  // 点缀色 - 睡莲的粉色
  accent: {
    light: '#F8BBD0',
    main: '#EC407A',
    dark: '#C2185B',
  },
  // 背景色 - 莫奈画作中的天空和水面
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
    light: '#E8F5E9',    // 淡绿色背景
  },
  // 文本色
  text: {
    primary: '#2E3B2E',   // 深绿灰色
    secondary: '#5D6D5D',
  },
  // 成功、警告、错误色
  success: {
    main: '#66BB6A',
  },
  warning: {
    main: '#FFA726',
  },
  error: {
    main: '#EF5350',
  },
  info: {
    main: '#42A5F5',
  },
};

const theme = createTheme({
  palette: {
    ...monetColors,
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.14)',
    '0px 20px 40px rgba(0, 0, 0, 0.16)',
    '0px 24px 48px rgba(0, 0, 0, 0.18)',
    '0px 28px 56px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.22)',
    '0px 36px 72px rgba(0, 0, 0, 0.24)',
    ...Array(14).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 28px',
          fontWeight: 600,
          fontSize: '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          '&:hover': {
            boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
            transform: 'translateY(-2px)',
            background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '1.1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        filled: {
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          boxShadow: '0 4px 20px rgba(76, 175, 80, 0.2)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.15)',
            },
          },
        },
      },
    },
  },
});

export default theme;
