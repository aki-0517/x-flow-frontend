import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency, formatNumber } from '../../lib/utils';

interface Resource {
  id: string;
  name: string;
  type: 'api' | 'context';
  requests: number;
  revenue: number;
  trend: 'up' | 'down' | 'neutral';
  trendPercentage: number;
}

const PopularResources: React.FC = () => {
  // Sample data for popular resources
  const resources: Resource[] = [
    {
      id: 'res_01',
      name: 'Weather API',
      type: 'api',
      requests: 25647,
      revenue: 128.24,
      trend: 'up',
      trendPercentage: 12,
    },
    {
      id: 'res_02',
      name: 'Market Research 2025',
      type: 'context',
      requests: 1532,
      revenue: 382.50,
      trend: 'up',
      trendPercentage: 28,
    },
    {
      id: 'res_03',
      name: 'Translation API',
      type: 'api',
      requests: 8745,
      revenue: 87.45,
      trend: 'down',
      trendPercentage: 5,
    },
    {
      id: 'res_04',
      name: 'Legal Statutes 2025',
      type: 'context',
      requests: 456,
      revenue: 114.00,
      trend: 'up',
      trendPercentage: 18,
    },
  ];

  const typeColors = {
    api: 'primary',
    context: 'accent',
  };

  const trendIcons = {
    up: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-success-500"
      >
        <path d="M8 4L13 9L11.59 10.41L8 6.83L4.41 10.41L3 9L8 4Z" fill="currentColor" />
      </svg>
    ),
    down: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-error-500"
      >
        <path d="M8 12L3 7L4.41 5.59L8 9.17L11.59 5.59L13 7L8 12Z" fill="currentColor" />
      </svg>
    ),
    neutral: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-500"
      >
        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  const trendColors = {
    up: 'text-success-500',
    down: 'text-error-500',
    neutral: 'text-slate-500',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Popular Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Badge variant={typeColors[resource.type] as any}>
                  {resource.type === 'api' ? 'API' : 'Context'}
                </Badge>
                <div>
                  <h4 className="font-medium">{resource.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatNumber(resource.requests)} requests
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(resource.revenue)}</p>
                <div className="flex items-center justify-end mt-1">
                  {trendIcons[resource.trend]}
                  <span className={`text-xs font-medium ml-1 ${trendColors[resource.trend]}`}>
                    {resource.trendPercentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularResources;