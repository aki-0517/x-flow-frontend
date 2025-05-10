import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Save, Bell, Lock, Wallet, Globe, Moon, Sun } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2"
                    defaultValue="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Zone
                  </label>
                  <select className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive notifications for incoming payments
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <span className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-primary-500 transition-colors" />
                    <span className="absolute inset-y-1 start-1 w-4 h-4 rounded-full bg-white peer-checked:translate-x-6 transition-transform" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resource Updates</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Get notified about resource status changes
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <span className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-primary-500 transition-colors" />
                    <span className="absolute inset-y-1 start-1 w-4 h-4 rounded-full bg-white peer-checked:translate-x-6 transition-transform" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive news and promotional materials
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700 peer-checked:bg-primary-500 transition-colors" />
                    <span className="absolute inset-y-1 start-1 w-4 h-4 rounded-full bg-white peer-checked:translate-x-6 transition-transform" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 p-2"
                  />
                </div>
                <Button leftIcon={<Lock size={16} />}>
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Sun size={20} />
                    <span>Light Mode</span>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Moon size={20} />
                    <span>Dark Mode</span>
                  </div>
                </button>
                <button className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} />
                    <span>System Default</span>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Bell size={16} />}
                >
                  Notification Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Wallet size={16} />}
                >
                  Payment Methods
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  leftIcon={<Lock size={16} />}
                >
                  Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button leftIcon={<Save size={16} />}>
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;