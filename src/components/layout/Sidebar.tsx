import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Wallet, 
  Code, 
  FileText,
  MonitorSmartphone
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { 
      name: 'Resources', 
      href: '#', 
      icon: MonitorSmartphone,
      children: [
        { name: 'API Resources', href: '/resources/api', icon: Code },
        { name: 'Context Resources', href: '/resources/context', icon: FileText },
      ]
    },
    { name: 'Upload Resource', href: '/upload', icon: Upload },
    { name: 'Price Configuration', href: '/pricing', icon: DollarSign },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check if current path is under a submenu and open it
    navigation.forEach(item => {
      if (item.children && item.children.some(child => child.href === location.pathname)) {
        setOpenSubmenu(item.name);
      }
    });
  }, [location.pathname, navigation]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => prev === name ? null : name);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-primary-500 text-white rounded-md w-8 h-8">
              <span className="font-bold text-sm">xF</span>
            </div>
            <span className="font-semibold text-lg">Flow</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto flex items-center justify-center bg-primary-500 text-white rounded-md w-8 h-8">
            <span className="font-bold text-sm">xF</span>
          </div>
        )}
      </div>
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div className="mb-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      "focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800",
                      openSubmenu === item.name ? "text-primary-500" : "text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 flex-1 text-left">{item.name}</span>
                        <svg
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSubmenu === item.name ? "transform rotate-180" : ""
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                  {!isCollapsed && openSubmenu === item.name && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-8 mt-1 space-y-1"
                    >
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.href}
                            className={cn(
                              "w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors",
                              location.pathname === child.href
                                ? "bg-primary-50 dark:bg-primary-900/50 text-primary-500"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                          >
                            <child.icon size={16} className="shrink-0" />
                            <span className="ml-3">{child.name}</span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary-50 dark:bg-primary-900/50 text-primary-500"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-16 px-2 border-t border-slate-200 dark:border-slate-800 flex items-center">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg
            className={cn("h-5 w-5 transition-transform", isCollapsed ? "transform rotate-180" : "")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;