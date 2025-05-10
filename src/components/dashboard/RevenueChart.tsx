import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

interface ChartData {
  date: string;
  revenue: number;
}

const RevenueChart: React.FC = () => {
  // Sample data for the chart
  const data: ChartData[] = [
    { date: 'May 1', revenue: 24.5 },
    { date: 'May 2', revenue: 13.2 },
    { date: 'May 3', revenue: 18.7 },
    { date: 'May 4', revenue: 27.3 },
    { date: 'May 5', revenue: 29.8 },
    { date: 'May 6', revenue: 35.2 },
    { date: 'May 7', revenue: 42.1 },
    { date: 'May 8', revenue: 39.6 },
    { date: 'May 9', revenue: 47.3 },
    { date: 'May 10', revenue: 54.2 },
    { date: 'May 11', revenue: 65.7 },
    { date: 'May 12', revenue: 72.5 },
    { date: 'May 13', revenue: 78.4 },
    { date: 'May 14', revenue: 85.2 },
  ];

  return (
    <Card className="w-full h-[360px]">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A2463" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0A2463" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tickMargin={8}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0A2463" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;