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
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12, // 圆角设计
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 不自动大写
          borderRadius: 12,
          padding: '8px 24px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.25)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;
