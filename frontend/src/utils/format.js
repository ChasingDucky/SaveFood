import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy年MM月dd日', { locale: zhCN });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd HH:mm', { locale: zhCN });
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  return timeString;
};

export const getDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

export const getStatusText = (status) => {
  const statusMap = {
    available: '可预订',
    reserved: '已预订',
    sold_out: '已售罄',
    pending: '待确认',
    confirmed: '已确认',
    ready: '待取货',
    completed: '已完成',
    cancelled: '已取消',
  };
  return statusMap[status] || status;
};

export const getCategoryIcon = (category) => {
  const iconMap = {
    '餐厅': '🍽️',
    '面包店': '🥖',
    '超市': '🛒',
    '咖啡店': '☕',
    '酒店': '🏨',
    '其他': '🏪',
  };
  return iconMap[category] || '🏪';
};
