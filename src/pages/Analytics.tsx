import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Calendar, Download, Filter } from 'lucide-react';

const Analytics: React.FC = () => {
  const revenueData = [
    { date: 'May 1', revenue: 24.5, requests: 1200 },
    { date: 'May 2', revenue: 13.2, requests: 800 },
    { date: 'May 3', revenue: 18.7, requests: 950 },
    { date: 'May 4', revenue: 27.3, requests: 1500 },
    { date: 'May 5', revenue: 29.8, requests: 1600 },
    { date: 'May 6', revenue: 35.2, requests: 1800 },
    { date: 'May 7', revenue: 42.1, requests: 2100 },
    { date: 'May 8', revenue: 39.6, requests: 1900 },
    { date: 'May 9', revenue: 47.3, requests: 2300 },
    { date: 'May 10', revenue: 54.2, requests: 2600 },
    { date: 'May 11', revenue: 65.7, requests: 3100 },
    { date: 'May 12', revenue: 72.5, requests: 3400 },
    { date: 'May 13', revenue: 78.4, requests: 3600 },
    { date: 'May 14', revenue: 85.2, requests: 3900 },
  ];

  const resourceDistribution = [
    { name: 'Weather API', value: 45 },
    { name: 'Market Data', value: 30 },
    { name: 'Translation', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#0A2463', '#38BEC9', '#FF9F1C', '#6B7280'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Detailed insights into your resource usage and revenue
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            Last 14 Days
          </Button>
          <Button variant="outline" leftIcon={<Filter size={16} />}>
            Filter
          </Button>
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
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
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0A2463"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#38BEC9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resource Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resourceDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.value}%
                    </span>
                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: COLORS[index],
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {resourceDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;