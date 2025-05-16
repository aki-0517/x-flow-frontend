import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { truncateAddress } from '../lib/utils';

const mockApis = [
  {
    id: 'weather',
    name: 'Weather Forecast API',
    description: 'Provides weather forecast data worldwide.',
    endpoints: 3,
    network: 'base-sepolia',
    price: '0.01',
    publisher: 'Takuya Nakamura',
    details: 'This API provides real-time weather forecast data worldwide. Searchable by city name or latitude/longitude.',
    payTo: '0x000000000000000000000000000000000000dead',
    asset: 'ETH',
    endpointUrl: 'https://api.example.com/weather',
    reqBodySample: '{ "city": "Tokyo" }',
  },
  {
    id: 'market',
    name: 'Market Data API',
    description: 'Market data API for stocks, forex, and cryptocurrencies.',
    endpoints: 5,
    network: 'sepolia',
    price: '0.02',
    publisher: 'shimizu chioka',
    details: 'Get the latest market data for stocks, forex, and cryptocurrencies.',
    payTo: '0x000000000000000000000000000000000000dead',
    asset: 'ETH',
    endpointUrl: 'https://api.example.com/market',
    reqBodySample: '{ "symbol": "BTCUSD" }',
  },
  {
    id: 'translation',
    name: 'Translation API',
    description: 'API supporting multilingual translation.',
    endpoints: 2,
    network: 'base-sepolia',
    price: '0.005',
    publisher: 'API Lab',
    details: 'API for translating text into multiple languages, including Japanese, English, Chinese, and more.',
    payTo: '0x000000000000000000000000000000000000dead',
    asset: 'ETH',
    endpointUrl: 'https://api.example.com/translate',
    reqBodySample: '{ "text": "Hello", "to": "ja" }',
  },
];

const ApiDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = mockApis.find(a => a.id === id);

  // ウォレット情報
  const { address, isConnected } = useAccount();

  // 支払い用
  const [txHash, setTxHash] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const { data: receipt } = useWaitForTransactionReceipt({ hash: txHash as `0x${string}` }, { enabled: !!txHash });
  const { sendTransaction } = useSendTransaction();

  // API呼び出し用
  const [reqBody, setReqBody] = useState(api?.reqBodySample || '');
  const [apiResponse, setApiResponse] = useState('');
  const [calling, setCalling] = useState(false);

  if (!api) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">API not found</h2>
        <Button onClick={() => navigate(-1)}>Back to List</Button>
      </div>
    );
  }

  // 支払い処理
  const handlePay = async () => {
    if (!address) return;
    setPaying(true);
    try {
      const { hash } = await sendTransaction({
        to: api.payTo as `0x${string}`,
        value: parseEther(api.price),
      });
      setTxHash(hash);
    } catch (e) {
      alert('送金に失敗しました');
    }
    setPaying(false);
  };

  // API呼び出し処理（モック: fetchでPOST）
  const handleCallApi = async () => {
    setCalling(true);
    setApiResponse('');
    try {
      const res = await fetch(api.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PAYMENT': txHash || '', // 本来はx402の支払いペイロード
        },
        body: reqBody,
      });
      const text = await res.text();
      setApiResponse(text);
    } catch (e) {
      setApiResponse('API呼び出しに失敗しました');
    }
    setCalling(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-4">← Back to List</Button>
      <div className="border rounded-lg bg-white dark:bg-slate-900 shadow p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl text-primary-600">{api.name}</span>
          <span className="text-xs bg-primary-100 text-primary-700 rounded px-2 py-0.5 ml-2">{api.network}</span>
        </div>
        <div className="text-slate-700 dark:text-slate-300 text-base">{api.description}</div>
        <div className="text-slate-500 text-sm mb-2">{api.details}</div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <span>Endpoints: {api.endpoints}</span>
          <span>Price: {api.price} {api.asset}</span>
          <span>Publisher: {api.publisher}</span>
        </div>
        <div className="mt-2 text-sm">
          <b>Recipient:</b> {truncateAddress(api.payTo)}<br />
          <b>API Endpoint:</b> <span className="break-all">{api.endpointUrl}</span>
        </div>
      </div>

      {/* ウォレット接続状態 */}
      <div className="border rounded bg-slate-50 dark:bg-slate-800 p-4 flex flex-col gap-2">
        <div className="font-semibold">Wallet Connection Status</div>
        {isConnected && address ? (
          <div className="text-green-600">Connected: {truncateAddress(address)}</div>
        ) : (
          <div className="text-red-500">Not connected (please connect using the WalletConnect button at the top right)</div>
        )}
      </div>

      {/* 支払いフォーム */}
      <div className="border rounded bg-slate-50 dark:bg-slate-800 p-4 flex flex-col gap-2">
        <div className="font-semibold mb-1">API Usage Payment</div>
        <div>Amount: <b>{api.price} {api.asset}</b> / Recipient: {truncateAddress(api.payTo)}</div>
        <Button onClick={handlePay} disabled={!isConnected || paying} isLoading={paying}>
          {txHash ? 'Pay Again' : 'Pay with Wallet'}
        </Button>
        {txHash && (
          <div className="text-xs mt-2">
            Transaction: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{truncateAddress(txHash)}</a><br />
            {receipt ? <span className="text-green-600">Payment Complete</span> : <span className="text-yellow-600">Waiting for Payment...</span>}
          </div>
        )}
      </div>

      {/* x402 API呼び出し */}
      <div className="border rounded bg-slate-50 dark:bg-slate-800 p-4 flex flex-col gap-2">
        <div className="font-semibold mb-1">x402 API Call</div>
        <div className="mb-1 text-xs">Request Body (JSON)</div>
        <textarea
          className="w-full h-24 p-2 font-mono text-sm border rounded bg-white dark:bg-slate-900"
          value={reqBody}
          onChange={e => setReqBody(e.target.value)}
        />
        <Button onClick={handleCallApi} disabled={!txHash || calling} isLoading={calling}>
          Call API
        </Button>
        <div className="mt-2 text-xs">
          <div className="font-semibold">Response</div>
          <pre className="bg-slate-100 rounded p-2 overflow-x-auto max-h-40">{apiResponse}</pre>
        </div>
      </div>
    </div>
  );
};

export default ApiDetailPage; 