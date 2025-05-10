import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ChevronDown, ChevronUp, DollarSign, BarChart3 } from 'lucide-react';

interface PriceModel {
  id: string;
  name: string;
  description: string;
}

interface ResourceEndpoint {
  id: string;
  name: string;
  path: string;
  method: string;
  expanded: boolean;
  basePrice: number;
  dataPrice: number;
  rateLimit: number;
  selectedModel: string;
}

const PriceConfiguration: React.FC = () => {
  // Price models for API endpoints
  const priceModels: PriceModel[] = [
    {
      id: 'fixed',
      name: 'Fixed Price',
      description: 'Charge a fixed amount per API call or context access',
    },
    {
      id: 'data-based',
      name: 'Data-Based Pricing',
      description: 'Charge based on the amount of data processed or returned',
    },
    {
      id: 'tiered',
      name: 'Tiered Pricing',
      description: 'Different prices based on usage volume tiers',
    },
    {
      id: 'complexity',
      name: 'Complexity-Based',
      description: 'Pricing based on computational complexity or resource usage',
    },
  ];

  // Sample resource endpoints
  const [endpoints, setEndpoints] = useState<ResourceEndpoint[]>([
    {
      id: 'ep1',
      name: 'Get Weather Forecast',
      path: '/api/weather/forecast',
      method: 'GET',
      expanded: false,
      basePrice: 0.01,
      dataPrice: 0.005,
      rateLimit: 1000,
      selectedModel: 'fixed',
    },
    {
      id: 'ep2',
      name: 'Get Historical Weather Data',
      path: '/api/weather/historical',
      method: 'GET',
      expanded: false,
      basePrice: 0.05,
      dataPrice: 0.01,
      rateLimit: 500,
      selectedModel: 'data-based',
    },
    {
      id: 'ep3',
      name: 'Get Location Data',
      path: '/api/locations',
      method: 'GET',
      expanded: false,
      basePrice: 0.02,
      dataPrice: 0.002,
      rateLimit: 2000,
      selectedModel: 'fixed',
    },
  ]);

  const [walletAddress, setWalletAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');

  const toggleEndpoint = (id: string) => {
    setEndpoints(endpoints.map(ep => 
      ep.id === id ? { ...ep, expanded: !ep.expanded } : ep
    ));
  };

  const updateEndpoint = (id: string, updates: Partial<ResourceEndpoint>) => {
    setEndpoints(endpoints.map(ep => 
      ep.id === id ? { ...ep, ...updates } : ep
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Price Configuration</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Configure pricing for your API endpoints and resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Resource endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50"
                      onClick={() => toggleEndpoint(endpoint.id)}
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded">
                            {endpoint.method}
                          </span>
                          <h3 className="font-medium">{endpoint.name}</h3>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {endpoint.path}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">${endpoint.basePrice.toFixed(4)}/call</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {priceModels.find(m => m.id === endpoint.selectedModel)?.name}
                          </p>
                        </div>
                        {endpoint.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    
                    {endpoint.expanded && (
                      <div className="border-t p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Pricing Model
                            </label>
                            <select 
                              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
                              value={endpoint.selectedModel}
                              onChange={(e) => updateEndpoint(endpoint.id, { selectedModel: e.target.value })}
                            >
                              {priceModels.map((model) => (
                                <option key={model.id} value={model.id}>
                                  {model.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {priceModels.find(m => m.id === endpoint.selectedModel)?.description}
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Base Price (USD)
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                $
                              </span>
                              <input
                                type="number"
                                min="0"
                                step="0.001"
                                className="flex-1 rounded-r-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
                                value={endpoint.basePrice}
                                onChange={(e) => updateEndpoint(endpoint.id, { basePrice: parseFloat(e.target.value) })}
                              />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Base price per API call
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Data Price (USD per KB)
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                $
                              </span>
                              <input
                                type="number"
                                min="0"
                                step="0.001"
                                className="flex-1 rounded-r-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
                                value={endpoint.dataPrice}
                                onChange={(e) => updateEndpoint(endpoint.id, { dataPrice: parseFloat(e.target.value) })}
                              />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Additional price per KB of data transferred
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Rate Limit (requests/day)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="100"
                              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
                              value={endpoint.rateLimit}
                              onChange={(e) => updateEndpoint(endpoint.id, { rateLimit: parseInt(e.target.value) })}
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Maximum number of requests per day
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t flex justify-end">
                          <Button variant="accent" size="sm">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Payment configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Wallet Address for Receiving Payments
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x..."
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Payments will be sent to this wallet address
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Supported Stablecoin
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                      <option value="usdc">USDC</option>
                      <option value="usdt">USDT</option>
                      <option value="dai">DAI</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Blockchain Network
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                      <option value="base">Base</option>
                      <option value="ethereum">Ethereum</option>
                      <option value="optimism">Optimism</option>
                      <option value="arbitrum">Arbitrum</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Payment Processing Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="onchain"
                        className="h-4 w-4 text-primary-500 rounded border-slate-300 dark:border-slate-700"
                        defaultChecked
                      />
                      <label htmlFor="onchain" className="ml-2 text-sm">
                        On-chain Payments
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="layer2"
                        className="h-4 w-4 text-primary-500 rounded border-slate-300 dark:border-slate-700"
                        defaultChecked
                      />
                      <label htmlFor="layer2" className="ml-2 text-sm">
                        Layer 2 Payments (lower fees)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="batch"
                        className="h-4 w-4 text-primary-500 rounded border-slate-300 dark:border-slate-700"
                        defaultChecked
                      />
                      <label htmlFor="batch" className="ml-2 text-sm">
                        Batch Processing (for micropayments)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Price simulation */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Estimated Daily Revenue</p>
                    <p className="text-xl font-semibold mt-1">$24.56</p>
                  </div>
                  <DollarSign size={24} className="text-primary-500" />
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Estimated Monthly Revenue</p>
                    <p className="text-xl font-semibold mt-1">$736.80</p>
                  </div>
                  <BarChart3 size={24} className="text-primary-500" />
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Assumptions</h3>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <li>- Get Weather Forecast: 1,500 calls/day</li>
                    <li>- Get Historical Weather: 250 calls/day</li>
                    <li>- Get Location Data: 800 calls/day</li>
                    <li>- Average data size: 5KB per response</li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full">
                  Run Detailed Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Market comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Market Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How your pricing compares to similar resources:
                </p>
                
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Your Average Price</span>
                    <span className="font-medium">$0.027/call</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                    <div className="h-2 bg-primary-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>Lower</span>
                    <span>Market Average: $0.06/call</span>
                    <span>Higher</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Your pricing is competitive and positioned well for market entry.
                </p>
                
                <Button variant="outline" className="w-full" size="sm">
                  View Detailed Market Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              Save Configuration
            </Button>
            <Button variant="success" className="w-full">
              Publish Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceConfiguration;