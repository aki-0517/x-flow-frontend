import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  BarChart3, 
  Users, 
  Zap 
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import PopularResources from '../components/dashboard/PopularResources';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Overview of your resources, revenue, and usage
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard
          title="Total Revenue"
          value="$1,284.56"
          icon={<DollarSign size={24} />}
          change={{ value: "12.5%", trend: "up" }}
          iconBg="bg-primary-100 dark:bg-primary-900/50"
          iconColor="text-primary-500"
        />
        <StatCard
          title="Total Requests"
          value="156,218"
          icon={<Zap size={24} />}
          change={{ value: "8.2%", trend: "up" }}
          iconBg="bg-warning-100 dark:bg-warning-900/50"
          iconColor="text-warning-500"
        />
        <StatCard
          title="Total Resources"
          value="16"
          icon={<BarChart3 size={24} />}
          change={{ value: "1 new", trend: "up" }}
          iconBg="bg-accent-100 dark:bg-accent-900/50"
          iconColor="text-accent-500"
        />
        <StatCard
          title="Unique Clients"
          value="83"
          icon={<Users size={24} />}
          change={{ value: "5.4%", trend: "up" }}
          iconBg="bg-success-100 dark:bg-success-900/50"
          iconColor="text-success-500"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <PopularResources />
        </div>
      </div>

      <div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;