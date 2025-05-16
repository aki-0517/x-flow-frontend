import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import WalletConnectButton from '../components/ui/WalletConnectButton';

const API_LIST_URL = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [apiList, setApiList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiList = async () => {
      try {
        console.log('APIリスト取得URL:', API_LIST_URL);
        const res = await fetch(API_LIST_URL);
        console.log('fetchレスポンスstatus:', res.status);
        const text = await res.text();
        console.log('fetchレスポンスbody:', text);
        const data = JSON.parse(text);
        setApiList(data);
        setLoading(false);
      } catch (e) {
        console.error('APIリスト取得エラー:', e);
        setApiList([]);
        setLoading(false);
      }
    };
    fetchApiList();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary-500 text-xl">xFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/upload" className="inline-block"><Button size="md" variant="primary">Publish Resource</Button></a>
          <WalletConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[40vh] py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 z-10">Want to publish your API now?</h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-8 z-10">Create an API specification and publish it to the API market</p>
        <a href="/upload" className="inline-block"><Button size="lg" variant="primary">How to publish your API</Button></a>
      </section>

      {/* 公開API一覧 */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Published APIs</h2>
        {loading ? (
          <div className="text-center text-slate-500">Loading...</div>
        ) : apiList.length === 0 ? (
          <div className="text-center text-slate-500">No APIs available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiList.map((api, idx) => (
              <div key={api.id || idx} className="border rounded-lg bg-white dark:bg-slate-900 shadow p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-primary-600">{api.resource || api.name}</span>
                  <span className="text-xs bg-primary-100 text-primary-700 rounded px-2 py-0.5 ml-2">{api.network || (api.endpoints && api.endpoints[0]?.network)}</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 text-sm mb-2">{api.description || (api.endpoints && api.endpoints[0]?.description)}</div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>Endpoints: {api.endpoints ? api.endpoints.length : 1}</span>
                  <span>Price: {api.price || (api.endpoints && api.endpoints[0]?.price)}</span>
                  <span>PayTo: {api.payTo}</span>
                </div>
                <div className="mt-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/api/${api.id || api.resource}`)}>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* x402 Protocol Simple Explainer */}
      <section className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">x402 Protocol Flow</h2>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>Client accesses API or resource</li>
          <li>Server responds with HTTP 402 Payment Required (returns amount, wallet, etc. in JSON)</li>
          <li>Client re-requests with payment payload (X-PAYMENT header)</li>
          <li>Server verifies payload, processes payment, and provides the resource</li>
        </ol>
        <div className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
          * Only fixed pricing is supported. Complex pricing, discounts, and analytics are not included.
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary-500 text-lg">xFlow</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/docs" className="hover:underline">Docs</a>
            <a href="/support" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 