import React, { useState } from 'react';
import Button from '../components/ui/Button';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import yaml from 'js-yaml';

function parseOpenApiEndpoints(apiSpecContent: string): { path: string, method: string, summary?: string }[] {
  let spec: any;
  try {
    spec = apiSpecContent.trim().startsWith('{')
      ? JSON.parse(apiSpecContent)
      : yaml.load(apiSpecContent);
  } catch (e) {
    return [];
  }
  if (!spec.paths) return [];
  const endpoints: { path: string, method: string, summary?: string }[] = [];
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, details] of Object.entries(methods as any)) {
      const d = details as any;
      endpoints.push({
        path,
        method: method.toUpperCase(),
        summary: d.summary || '',
      });
    }
  }
  return endpoints;
}

const endpointParamDefaults = {
  price: '',
  network: 'base-sepolia',
  description: '',
  maxTimeoutSeconds: '60',
};

const NETWORK_OPTIONS = [
  { label: 'Base Sepolia', value: 'base-sepolia' },
  { label: 'Sepolia', value: 'sepolia' },
];

const UploadResource: React.FC = () => {
  const [resourceType, setResourceType] = useState<'api' | 'context'>('api');
  const [apiSpecContent, setApiSpecContent] = useState('');
  const [endpoints, setEndpoints] = useState<{ path: string, method: string, summary?: string }[]>([]);
  const [endpointParams, setEndpointParams] = useState<{ [key: string]: any }>({});
  const [fixedParams, setFixedParams] = useState({ ...endpointParamDefaults });
  const [wallet, setWallet] = useState('');
  const [published, setPublished] = useState(false);
  const [resourceName, setResourceName] = useState('');

  const handleApiSpecChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setApiSpecContent(value);
    try {
      const eps = parseOpenApiEndpoints(value);
      setEndpoints(eps);
      // Initialize parameters
      const paramInit: { [key: string]: any } = {};
      eps.forEach(ep => {
        const key = ep.path + ':' + ep.method;
        paramInit[key] = endpointParams[key] || { ...endpointParamDefaults };
      });
      setEndpointParams(paramInit);
    } catch {
      setEndpoints([]);
      setEndpointParams({});
    }
  };

  const handleEndpointParamChange = (key: string, field: string, value: string) => {
    setEndpointParams(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleFixedParamChange = (field: string, value: string) => {
    setFixedParams(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = () => {
    setPublished(true);
  };

  // Check if all required parameters are set for all API resource endpoints
  const allApiParamsSet = endpoints.length > 0 && endpoints.every(ep => {
    const p = endpointParams[ep.path + ':' + ep.method];
    return p && p.price && p.network;
  });
  // Required parameters for context resource
  const allContextParamsSet = fixedParams.price && fixedParams.network && wallet && resourceName;

  return (
    <div className="max-w-xl mx-auto py-12 space-y-8">
      <h1 className="text-2xl font-bold mb-2">Publish Resource</h1>
      <div className="flex space-x-4 mb-4">
        <Button
          variant={resourceType === 'api' ? 'primary' : 'secondary'}
          onClick={() => { setResourceType('api'); setApiSpecContent(''); setEndpoints([]); setEndpointParams({}); setResourceName(''); setPublished(false); }}
        >API Resource</Button>
        <Button
          variant={resourceType === 'context' ? 'primary' : 'secondary'}
          onClick={() => { setResourceType('context'); setApiSpecContent(''); setEndpoints([]); setEndpointParams({}); setResourceName(''); setPublished(false); }}
        >Context Resource</Button>
      </div>
      {resourceType === 'api' && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">API Resource Name</label>
            <input
              type="text"
              className="input w-full border rounded px-3 py-2"
              placeholder="e.g. Weather API"
              value={resourceName}
              onChange={e => setResourceName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">OpenAPI Spec (YAML or JSON)</label>
            <textarea
              className="w-full h-48 p-2 font-mono text-sm border rounded bg-slate-50"
              value={apiSpecContent}
              onChange={handleApiSpecChange}
              placeholder="# Paste your OpenAPI spec here"
            />
          </div>
          {apiSpecContent && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2">API Spec Preview</h2>
              <div className="border rounded bg-white dark:bg-slate-900 p-2 mb-4">
                <SwaggerUI spec={(() => {
                  try {
                    return apiSpecContent.trim().startsWith('{')
                      ? JSON.parse(apiSpecContent)
                      : yaml.load(apiSpecContent);
                  } catch {
                    return { info: { title: 'Parse Error', description: 'Failed to parse OpenAPI definition' } };
                  }
                })()} />
              </div>
              <h3 className="font-semibold mb-2">Parameter Settings per Endpoint</h3>
              <div className="space-y-4">
                {endpoints.length === 0 && <div className="text-sm text-error-500">No endpoints found</div>}
                {endpoints.map(ep => {
                  const key = ep.path + ':' + ep.method;
                  const p = endpointParams[key] || { ...endpointParamDefaults };
                  return (
                    <div key={key} className="border rounded p-3 bg-slate-50">
                      <div className="mb-2 font-mono text-xs bg-slate-100 rounded px-2 py-1">[{ep.method}] {ep.path} {ep.summary && <span className='text-slate-400 ml-2'>// {ep.summary}</span>}</div>
                      <div className="grid grid-cols-1 gap-2">
                        <label>
                          Price (USDC)<span className="text-error-500">*</span>
                          <input type="text" className="input border rounded px-2 py-1 w-full" placeholder="e.g. 0.01" value={p.price} onChange={e => handleEndpointParamChange(key, 'price', e.target.value)} />
                        </label>
                        <label>
                          network<span className="text-error-500">*</span>
                          <select className="input border rounded px-2 py-1 w-full" value={p.network} onChange={e => handleEndpointParamChange(key, 'network', e.target.value)}>
                            {NETWORK_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </label>
                        <label>
                          description
                          <input type="text" className="input border rounded px-2 py-1 w-full" value={p.description} onChange={e => handleEndpointParamChange(key, 'description', e.target.value)} />
                        </label>
                        <label>
                          maxTimeoutSeconds
                          <input type="text" className="input border rounded px-2 py-1 w-full" value={p.maxTimeoutSeconds} onChange={e => handleEndpointParamChange(key, 'maxTimeoutSeconds', e.target.value)} />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
      {resourceType === 'context' && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Resource Name</label>
            <input
              type="text"
              className="input w-full border rounded px-3 py-2"
              placeholder="e.g. Market Research 2025"
              value={resourceName}
              onChange={e => setResourceName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label>
              Price (USDC)<span className="text-error-500">*</span>
              <input type="text" className="input border rounded px-2 py-1 w-full" placeholder="e.g. 0.01" value={fixedParams.price} onChange={e => handleFixedParamChange('price', e.target.value)} />
            </label>
            <label>
              network<span className="text-error-500">*</span>
              <select className="input border rounded px-2 py-1 w-full" value={fixedParams.network} onChange={e => handleFixedParamChange('network', e.target.value)}>
                {NETWORK_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
            <label>
              description
              <input type="text" className="input border rounded px-2 py-1 w-full" value={fixedParams.description} onChange={e => handleFixedParamChange('description', e.target.value)} />
            </label>
            <label>
              maxTimeoutSeconds
              <input type="text" className="input border rounded px-2 py-1 w-full" value={fixedParams.maxTimeoutSeconds} onChange={e => handleFixedParamChange('maxTimeoutSeconds', e.target.value)} />
            </label>
          </div>
        </>
      )}
      <div>
        <label className="block font-medium mb-1">Recipient Wallet Address</label>
        <input
          type="text"
          className="input w-full border rounded px-3 py-2"
          placeholder="0x..."
          value={wallet}
          onChange={e => setWallet(e.target.value)}
        />
      </div>
      <Button
        className="w-full"
        onClick={handlePublish}
        disabled={resourceType === 'api'
          ? !(apiSpecContent && endpoints.length > 0 && allApiParamsSet && wallet && resourceName)
          : !allContextParamsSet
        }
      >Publish</Button>

      {published && (
        <div className="mt-8 p-4 bg-slate-50 rounded border">
          <h2 className="font-bold mb-2">HTTP 402 Payment Required Sample Response</h2>
          <pre className="bg-slate-100 rounded p-2 text-xs overflow-x-auto">
{resourceType === 'api'
  ? JSON.stringify({
      resource: resourceName,
      endpoints: endpoints.map(ep => {
        const { price, network, description, maxTimeoutSeconds } = endpointParams[ep.path + ':' + ep.method] || {};
        return {
          path: ep.path,
          method: ep.method,
          price,
          network,
          description,
          maxTimeoutSeconds,
          payTo: wallet,
          asset: 'USDC',
        };
      })
    }, null, 2)
  : JSON.stringify({
      resource: resourceName,
      price: fixedParams.price,
      network: fixedParams.network,
      description: fixedParams.description,
      maxTimeoutSeconds: fixedParams.maxTimeoutSeconds,
      payTo: wallet,
      asset: 'USDC',
    }, null, 2)
}
          </pre>
          <div className="mt-4 text-sm text-slate-600">
            <b>Payment Flow:</b><br />
            1. Client receives the above JSON and generates a payment payload (X-PAYMENT header)<br />
            2. Server verifies the payload and provides the resource after payment is completed<br />
            * Price and parameters can be set individually for each endpoint or for the entire resource.
          </div>
          <div className="mt-6">
            <button
              className="btn-primary px-4 py-2 rounded"
              onClick={() => {
                let config;
                if (resourceType === 'api') {
                  config = {
                    resource: resourceName,
                    endpoints: endpoints.map(ep => {
                      const { price, network, description, maxTimeoutSeconds } = endpointParams[ep.path + ':' + ep.method] || {};
                      return {
                        path: ep.path,
                        method: ep.method,
                        price,
                        network,
                        description,
                        maxTimeoutSeconds,
                        payTo: wallet,
                        asset: 'USDC',
                      };
                    })
                  };
                } else {
                  config = {
                    resource: resourceName,
                    price: fixedParams.price,
                    network: fixedParams.network,
                    description: fixedParams.description,
                    maxTimeoutSeconds: fixedParams.maxTimeoutSeconds,
                    payTo: wallet,
                    asset: 'USDC',
                  };
                }
                const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'x402-config.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >x402-config.json をダウンロード</button>
            <div className="text-xs text-slate-500 mt-2">この設定ファイルを使って x402-express サーバを起動できます。</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResource;