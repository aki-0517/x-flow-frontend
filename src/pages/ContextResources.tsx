import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { FileText, BarChart3, Clock, Users, ArrowUpRight, FileBox, Database } from 'lucide-react';

const ContextResources: React.FC = () => {
  const resources = [
    {
      id: 'ctx1',
      name: 'Market Research 2025',
      description: 'Comprehensive market analysis and future trends',
      type: 'document',
      format: 'PDF',
      size: '2.4 MB',
      status: 'active',
      clients: 45,
      revenue: '$382.50',
      trend: 'up',
      trendValue: '28.5%',
      lastUpdated: '2 days ago',
    },
    {
      id: 'ctx2',
      name: 'Legal Statutes Database',
      description: 'Updated collection of legal regulations and statutes',
      type: 'dataset',
      format: 'JSON',
      size: '156 MB',
      status: 'active',
      clients: 23,
      revenue: '$114.00',
      trend: 'up',
      trendValue: '18.2%',
      lastUpdated: '5 days ago',
    },
    {
      id: 'ctx3',
      name: 'Industry Reports Bundle',
      description: 'Collection of industry-specific analysis reports',
      type: 'collection',
      format: 'Multiple',
      size: '45 MB',
      status: 'pending',
      clients: 12,
      revenue: '$89.25',
      trend: 'down',
      trendValue: '5.3%',
      lastUpdated: '1 week ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Context Resources</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your context resources and datasets
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Database size={16} />}>
            Import Dataset
          </Button>
          <Button leftIcon={<FileText size={16} />}>
            Upload Context
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-semibold mt-1">$585.75</p>
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
                  Active Resources
                </p>
                <p className="text-2xl font-semibold mt-1">8</p>
              </div>
              <FileBox className="text-primary-500" size={24} />
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
                <p className="text-2xl font-semibold mt-1">80</p>
              </div>
              <Users className="text-primary-500" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Context Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{resource.name}</h3>
                      <Badge
                        variant={resource.status === 'active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {resource.status}
                      </Badge>
                      <Badge variant="accent" size="sm">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {resource.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Format
                    </p>
                    <p className="font-medium mt-1">{resource.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Size
                    </p>
                    <p className="font-medium mt-1">{resource.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Active Clients
                    </p>
                    <p className="font-medium mt-1">{resource.clients}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Last Updated
                    </p>
                    <p className="font-medium mt-1">{resource.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Monthly Revenue
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="font-medium">{resource.revenue}</p>
                      <span
                        className={`text-xs ${
                          resource.trend === 'up'
                            ? 'text-success-500'
                            : 'text-error-500'
                        }`}
                      >
                        {resource.trend === 'up' ? '↑' : '↓'} {resource.trendValue}
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

export default ContextResources;