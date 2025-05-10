import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Copy, ExternalLink } from 'lucide-react';

const Wallet: React.FC = () => {
  const transactions = [
    {
      id: 'tx1',
      type: 'received',
      amount: 0.25,
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      timestamp: '2 minutes ago',
      resource: 'Weather API',
    },
    {
      id: 'tx2',
      type: 'received',
      amount: 0.75,
      from: '0x3A9d753d77935b8d15411464A0e6E52fA0fbB31D',
      timestamp: '15 minutes ago',
      resource: 'Market Research 2025',
    },
    {
      id: 'tx3',
      type: 'withdrawal',
      amount: 50.00,
      to: '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
      timestamp: '1 hour ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Wallet</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your earnings and payment settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <WalletIcon className="text-primary-500" size={24} />
              <Badge variant="success">Connected</Badge>
            </div>
            <h3 className="text-lg font-medium">Available Balance</h3>
            <p className="text-3xl font-semibold mt-2">$1,284.56</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              1,284.56 USDC
            </p>
            <div className="flex space-x-3 mt-4">
              <Button className="flex-1">Withdraw</Button>
              <Button variant="outline" className="flex-1">History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Wallet Address</h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="flex items-center justify-between">
                <code className="text-sm">0x742d...f44e</code>
                <Button variant="ghost" size="sm">
                  <Copy size={16} />
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              All payments will be sent to this address
            </p>
            <Button variant="outline" className="w-full mt-4" leftIcon={<ExternalLink size={16} />}>
              View on Explorer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Preferred Stablecoin
                </label>
                <select className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2">
                  <option>USDC</option>
                  <option>USDT</option>
                  <option>DAI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Network
                </label>
                <select className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2">
                  <option>Base</option>
                  <option>Ethereum</option>
                  <option>Optimism</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'received'
                      ? 'bg-success-100 dark:bg-success-900/30 text-success-500'
                      : 'bg-warning-100 dark:bg-warning-900/30 text-warning-500'
                  }`}>
                    {tx.type === 'received' ? (
                      <ArrowDownRight size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {tx.type === 'received' ? 'Payment Received' : 'Withdrawal'}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {tx.timestamp}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {tx.type === 'received' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {tx.resource || `To: ${tx.to?.slice(0, 6)}...${tx.to?.slice(-4)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;