import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatCurrency, getRelativeTimeString } from '../../lib/utils';

interface Transaction {
  id: string;
  type: 'api' | 'context';
  resourceName: string;
  amount: number;
  timestamp: number;
  status: 'completed' | 'pending' | 'failed';
  client: string;
}

const RecentTransactions: React.FC = () => {
  // Sample data for recent transactions
  const transactions: Transaction[] = [
    {
      id: 'tx_123456',
      type: 'api',
      resourceName: 'Weather API',
      amount: 0.25,
      timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
      status: 'completed',
      client: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    {
      id: 'tx_123457',
      type: 'context',
      resourceName: 'Market Research 2025',
      amount: 0.75,
      timestamp: Date.now() - 1000 * 60 * 20, // 20 minutes ago
      status: 'completed',
      client: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    {
      id: 'tx_123458',
      type: 'api',
      resourceName: 'Translation API',
      amount: 0.05,
      timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
      status: 'completed',
      client: '0x3A9d753d77935b8d15411464A0e6E52fA0fbB31D',
    },
    {
      id: 'tx_123459',
      type: 'api',
      resourceName: 'Weather API',
      amount: 0.01,
      timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
      status: 'pending',
      client: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    },
    {
      id: 'tx_123460',
      type: 'context',
      resourceName: 'Legal Statutes 2025',
      amount: 1.25,
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      status: 'completed',
      client: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
    },
  ];

  const statusColors = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
  };

  const typeColors = {
    api: 'primary',
    context: 'accent',
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Resource</th>
                <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Amount</th>
                <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Client</th>
                <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Time</th>
                <th className="pb-3 text-left font-medium text-slate-500 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                >
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={typeColors[transaction.type] as any} 
                        size="sm"
                      >
                        {transaction.type === 'api' ? 'API' : 'CTX'}
                      </Badge>
                      <span className="font-medium">{transaction.resourceName}</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{truncateHash(transaction.client)}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{getRelativeTimeString(transaction.timestamp)}</td>
                  <td className="py-3">
                    <Badge 
                      variant={statusColors[transaction.status] as any} 
                      size="sm"
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;