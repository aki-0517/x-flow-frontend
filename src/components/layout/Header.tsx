import React from 'react';
import { Moon, Sun, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [showNotifications, setShowNotifications] = React.useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New transaction received',
      message: 'You received 0.05 USDC from a client',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'API usage spike',
      message: 'Your weather API has seen a 200% increase in usage',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Wallet connected',
      message: 'Your wallet has been successfully connected',
      time: '1 day ago',
      read: true,
    },
  ];

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
          xFlow
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-9 h-9 p-0 rounded-full"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 p-0 rounded-full"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full"></span>
          </Button>
          
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-elevated border border-slate-200 dark:border-slate-800 z-50"
            >
              <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="error" size="sm">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-slate-200 dark:border-slate-800">
                <Button variant="ghost" size="sm" className="w-full text-primary-500">
                  View all notifications
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;