import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAccount, useWalletClient } from 'wagmi';
import { wrapFetchWithPayment, decodeXPaymentResponse } from 'x402-fetch';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApiDetailPage: React.FC = () => {
  const { id: resourceName } = useParams();
  const navigate = useNavigate();
  const [apiConfig, setApiConfig] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [calling, setCalling] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    setLoadingConfig(true);
    const fetchConfig = async () => {
      try {
        const url = await getDownloadURL(ref(storage, `api-configs/${resourceName}.json`));
        console.log('API設定ファイル取得URL:', url);
        const res = await fetch(url);
        console.log('fetchレスポンスstatus:', res.status);
        const text = await res.text();
        console.log('fetchレスポンスbody:', text);
        const data = JSON.parse(text);
        setApiConfig(data);
        setLoadingConfig(false);
      } catch (e) {
        console.error('API設定ファイル取得エラー:', e);
        setError('API設定ファイルの取得に失敗しました');
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [resourceName]);

  const handleCallApi = async (endpoint: any, reqBody?: string) => {
    setCalling(true);
    setApiResponse('');
    try {
      if (!walletClient) {
        setApiResponse('ウォレットが接続されていません。');
        setCalling(false);
        return;
      }
      const url = `${API_BASE_URL}${endpoint.path.startsWith('/') ? '' : '/'}${endpoint.path}?resource=${resourceName}`;
      const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient);
      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (endpoint.method !== 'GET' && endpoint.method !== 'HEAD') {
        options.body = reqBody;
      }
      const response = await fetchWithPayment(url, options);
      let bodyText = '';
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        bodyText = JSON.stringify(await response.json(), null, 2);
      } else {
        bodyText = await response.text();
      }
      setApiResponse(bodyText);
      const paymentResponse = response.headers.get('x-payment-response');
      if (paymentResponse) {
        const decodedPayment = decodeXPaymentResponse(paymentResponse);
        setApiResponse(prev => prev + '\n---\nPayment Information:\n' + JSON.stringify(decodedPayment, null, 2));
      }
    } catch (e: any) {
      let errorMsg = 'API call failed: ' + (e.message || e.toString());
      if (e.response) {
        try {
          const errBody = await e.response.text();
          errorMsg += '\n' + errBody;
        } catch {}
      }
      setApiResponse(errorMsg);
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
              {ep.method !== 'GET' && ep.method !== 'HEAD' && (
                <textarea
                  className="w-full h-20 p-2 font-mono text-sm border rounded bg-white dark:bg-slate-900"
                  defaultValue={JSON.stringify({ sample: 'request' }, null, 2)}
                  id={`reqbody-${idx}`}
                />
              )}
              <Button
                onClick={() => handleCallApi(
                  ep,
                  (ep.method !== 'GET' && ep.method !== 'HEAD')
                    ? (document.getElementById(`reqbody-${idx}`) as HTMLTextAreaElement)?.value
                    : undefined
                )}
                disabled={!isConnected || calling}
                isLoading={calling}
              >
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