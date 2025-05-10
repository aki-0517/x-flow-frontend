import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  iconBg?: string;
  iconColor?: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  iconBg = 'bg-primary-100 dark:bg-primary-900/50',
  iconColor = 'text-primary-500',
  description,
}) => {
  const trendColors = {
    up: 'text-success-500',
    down: 'text-error-500',
    neutral: 'text-slate-500',
  };

  const trendIcons = {
    up: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4L13 9L11.59 10.41L8 6.83L4.41 10.41L3 9L8 4Z" fill="currentColor" />
      </svg>
    ),
    down: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L3 7L4.41 5.59L8 9.17L11.59 5.59L13 7L8 12Z" fill="currentColor" />
      </svg>
    ),
    neutral: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">{value}</h3>
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {description}
              </p>
            )}
            {change && (
              <div className="mt-2 flex items-center">
                <span className={cn('text-xs font-medium flex items-center', trendColors[change.trend])}>
                  {trendIcons[change.trend]}
                  <span className="ml-1">{change.value}</span>
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">vs. previous period</span>
              </div>
            )}
          </div>
          <div className={cn('p-2 rounded-lg', iconBg)}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;