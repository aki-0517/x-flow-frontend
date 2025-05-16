import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAccount } from 'wagmi';
import { wrapFetchWithPayment, decodeXPaymentResponse } from 'x402-fetch';

const ApiDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiConfig, setApiConfig] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [calling, setCalling] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setLoadingConfig(true);
    fetch(`/x402-config.json`)
      .then(res => res.json())
      .then(data => {
        setApiConfig(data);
        setLoadingConfig(false);
      })
      .catch(e => {
        setError('Failed to fetch API configuration');
        setLoadingConfig(false);
      });
  }, [id]);

  const handleCallApi = async (endpoint: any, reqBody: string) => {
    setCalling(true);
    setApiResponse('');
    try {
      const fetchWithPayment = wrapFetchWithPayment(fetch, window.ethereum);
      const url = endpoint.path.startsWith('/') ? endpoint.path : `/${endpoint.path}`;
      const response = await fetchWithPayment(url, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: reqBody,
      });
      const body = await response.text();
      setApiResponse(body);
      const paymentResponse = response.headers.get('x-payment-response');
      if (paymentResponse) {
        const decodedPayment = decodeXPaymentResponse(paymentResponse);
        setApiResponse(prev => prev + '\n---\nPayment Information:\n' + JSON.stringify(decodedPayment, null, 2));
      }
    } catch (e: any) {
      setApiResponse('API call failed: ' + (e.message || e.toString()));
    }
    setCalling(false);
  };

  if (loadingConfig) return <div className="max-w-xl mx-auto py-16 text-center">Loading API configuration...</div>;
  if (error) return <div className="max-w-xl mx-auto py-16 text-center text-red-500">{error}</div>;
  if (!apiConfig) return <div className="max-w-xl mx-auto py-16 text-center">API configuration not found</div>;

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-4">← Back to List</Button>
      <div className="border rounded-lg bg-white dark:bg-slate-900 shadow p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-primary-600">{apiConfig.resource}</span>
        </div>
      </div>
      {apiConfig.endpoints && apiConfig.endpoints.length > 0 && (
        <div className="space-y-6">
          {apiConfig.endpoints.map((ep: any, idx: number) => (
            <div key={idx} className="border rounded bg-slate-50 dark:bg-slate-800 p-4 flex flex-col gap-2">
              <div className="font-semibold mb-1">[{ep.method}] {ep.path}</div>
              <div className="text-xs text-slate-500 mb-2">{ep.description}</div>
              <div className="text-xs text-slate-500 mb-2">
                Price: {ep.price} / Network: {ep.network}
              </div>
              <div className="text-xs text-slate-500 mb-2">
                PayTo: {ep.payTo} / Asset: {ep.asset}
              </div>
              <div className="text-xs text-slate-500 mb-2">
                Max Timeout: {ep.maxTimeoutSeconds} 秒
              </div>
              <textarea
                className="w-full h-20 p-2 font-mono text-sm border rounded bg-white dark:bg-slate-900"
                defaultValue={JSON.stringify({ sample: 'request' }, null, 2)}
                id={`reqbody-${idx}`}
              />
              <Button onClick={() => handleCallApi(ep, (document.getElementById(`reqbody-${idx}`) as HTMLTextAreaElement)?.value)} disabled={!isConnected || calling} isLoading={calling}>
                Make API Request with Payment
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 text-xs">
        <div className="font-semibold">Response</div>
        <pre className="bg-slate-100 rounded p-2 overflow-x-auto max-h-40">{apiResponse}</pre>
      </div>
    </div>
  );
};

export default ApiDetailPage; 