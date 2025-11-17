import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import { Store, Fastfood, Receipt } from '@mui/icons-material';

// 简化的商家仪表板，实际应用中需要更多功能
const MerchantDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        商家管理后台
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<Store />} label="商家信息" />
          <Tab icon={<Fastfood />} label="食物包管理" />
          <Tab icon={<Receipt />} label="订单管理" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              商家信息管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              在这里可以管理您的商家基本信息、营业时间、地址等
            </Typography>
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              食物包管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              在这里可以创建、编辑和管理您发布的食物包
            </Typography>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              订单管理
            </Typography>
            <Typography variant="body2" color="text.secondary">
              查看和管理客户订单，更新订单状态
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default MerchantDashboard;
