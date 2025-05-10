import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Code, BarChart3, Clock, Users, ArrowUpRight } from 'lucide-react';

const APIResources: React.FC = () => {
  const apis = [
    {
      id: 'api1',
      name: 'Weather Forecast API',
      description: 'Real-time weather data and forecasts with global coverage',
      status: 'active',
      endpoints: 12,
      clients: 156,
      uptime: '99.99%',
      revenue: '$1,284.56',
      trend: 'up',
      trendValue: '12.5%',
    },
    {
      id: 'api2',
      name: 'Market Data API',
      description: 'Financial market data with real-time updates and historical data',
      status: 'active',
      endpoints: 8,
      clients: 89,
      uptime: '99.95%',
      revenue: '$2,156.32',
      trend: 'up',
      trendValue: '8.2%',
    },
    {
      id: 'api3',
      name: 'Translation API',
      description: 'Neural machine translation supporting 95+ languages',
      status: 'maintenance',
      endpoints: 4,
      clients: 234,
      uptime: '99.80%',
      revenue: '$856.12',
      trend: 'down',
      trendValue: '3.1%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">API Resources</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and monitor your API endpoints
          </p>
        </div>
        <Button leftIcon={<Code size={16} />}>
          Add New API
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold mt-1">$4,297.00</p>
              </div>
              <BarChart3 className="text-primary-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Active Endpoints
                </p>
                <p className="text-2xl font-semibold mt-1">24</p>
              </div>
              <Code className="text-primary-500" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Clients
                </p>
                <p className="text-2xl font-semibold mt-1">479</p>
              </div>
              <Users className="text-primary-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your APIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apis.map((api) => (
              <div
                key={api.id}
                className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{api.name}</h3>
                      <Badge
                        variant={api.status === 'active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {api.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {api.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Endpoints
                    </p>
                    <p className="font-medium mt-1">{api.endpoints}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Active Clients
                    </p>
                    <p className="font-medium mt-1">{api.clients}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Uptime
                    </p>
                    <p className="font-medium mt-1">{api.uptime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Monthly Revenue
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="font-medium">{api.revenue}</p>
                      <span
                        className={`text-xs ${
                          api.trend === 'up'
                            ? 'text-success-500'
                            : 'text-error-500'
                        }`}
                      >
                        {api.trend === 'up' ? '↑' : '↓'} {api.trendValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIResources;