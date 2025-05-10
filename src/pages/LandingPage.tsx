import React from 'react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

// SVGやイラストは簡易なものをインラインで用意

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary-500 text-xl">xFlow</span>
        </div>
        <a href="/" className="inline-block"><Button size="md" variant="primary">Demo</Button></a>
      </header>

      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] py-16 text-center">
        <div className="absolute inset-0 pointer-events-none select-none opacity-20">
          {/* Subtle blockchain-inspired SVG background */}
          <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="100" r="80" fill="#38BEC9" fillOpacity="0.08" />
            <rect x="900" y="180" width="200" height="200" rx="40" fill="#0A2463" fillOpacity="0.06" />
            <path d="M0,160L80,144C160,128,320,96,480,122.7C640,149,800,235,960,245.3C1120,256,1280,192,1360,160L1440,128" stroke="#FF9F1C" strokeWidth="2" fill="none" opacity="0.07" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 z-10">Monetize APIs & MCP Context Resources with x402</h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-8 z-10">Enable machine-native microtransactions for API & MCP with HTTP 402 Protocol</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center z-10 mb-4 mt-16">
          <a href="/" className="inline-block"><Button size="lg" variant="primary">View Demo</Button></a>
        </div>
        {/* Animation: Value flow (placeholder) */}
        <div className="mt-12 flex justify-center z-10">
          <svg width="320" height="80" viewBox="0 0 320 80" fill="none">
            <circle cx="40" cy="40" r="32" fill="#38BEC9" fillOpacity="0.2" />
            <rect x="120" y="20" width="80" height="40" rx="16" fill="#0A2463" fillOpacity="0.15" />
            <circle cx="280" cy="40" r="24" fill="#FF9F1C" fillOpacity="0.18" />
            <path d="M72 40 Q120 40 120 40" stroke="#38BEC9" strokeWidth="3" markerEnd="url(#arrow)" />
            <path d="M200 40 Q248 40 280 40" stroke="#0A2463" strokeWidth="3" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#0A2463" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* 2. Value Proposition Trio */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Why Developers Choose x402 for API & MCP</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Microtransactions for API & MCP</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Charge as little as <span className="font-mono">$0.001</span> per API or MCP resource access</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Instant Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>200ms settlement time with stablecoin transactions for API & MCP</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Keyless Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Replace API keys with blockchain-verified payments for API & MCP</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Problem/Solution Section */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card p-8">
          <h3 className="text-xl font-semibold mb-4 text-error-600">The Problem</h3>
          <p className="text-slate-700 dark:text-slate-300">Traditional API & MCP monetization is broken. Fixed subscriptions don't match actual usage. API keys create friction for both API and MCP resources.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-card p-8 border-l-4 border-primary-500">
          <h3 className="text-xl font-semibold mb-4 text-primary-600">The Solution</h3>
          <p className="text-slate-700 dark:text-slate-300">x402 creates a direct value exchange for API & MCP. Pay-per-use with blockchain precision. No keys, just transactions.</p>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Simple by Design for API & MCP</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Upload Icon */}
              <svg width="48" height="48" fill="none"><rect x="8" y="16" width="32" height="24" rx="6" fill="#38BEC9" fillOpacity="0.15"/><path d="M24 32V16M24 16l-6 6M24 16l6 6" stroke="#0A2463" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Upload</h4>
            <p className="text-center text-slate-600 dark:text-slate-400">Import your OpenAPI spec or MCP context resources</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Configure Icon */}
              <svg width="48" height="48" fill="none"><circle cx="24" cy="24" r="20" fill="#FF9F1C" fillOpacity="0.12"/><path d="M24 16v8l6 3" stroke="#0A2463" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Configure</h4>
            <p className="text-center text-slate-600 dark:text-slate-400">Set pricing parameters for API & MCP with our intuitive interface</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Deploy Icon */}
              <svg width="48" height="48" fill="none"><rect x="8" y="8" width="32" height="32" rx="8" fill="#0A2463" fillOpacity="0.10"/><path d="M16 32l8-16 8 16" stroke="#38BEC9" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <h4 className="font-semibold mb-2">Deploy</h4>
            <p className="text-center text-slate-600 dark:text-slate-400">Publish as x402-enabled API & MCP endpoints instantly</p>
          </div>
        </div>
      </section>

      {/* 5. Technical Explainer */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">The x402 Protocol for API & MCP</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Visual Diagram (placeholder) */}
          <div className="flex-1 flex justify-center">
            <svg width="320" height="180" fill="none">
              <rect x="20" y="40" width="80" height="40" rx="12" fill="#38BEC9" fillOpacity="0.15"/>
              <text x="60" y="65" fontSize="14" fill="#0A2463">Client</text>
              <rect x="220" y="40" width="80" height="40" rx="12" fill="#FF9F1C" fillOpacity="0.15"/>
              <text x="260" y="65" fontSize="14" fill="#0A2463">API & MCP</text>
              <path d="M100 60 Q160 20 220 60" stroke="#0A2463" strokeWidth="2" markerEnd="url(#arrow2)"/>
              <text x="140" y="30" fontSize="12" fill="#0A2463">402 Payment Required</text>
              <path d="M220 80 Q160 140 100 80" stroke="#38BEC9" strokeWidth="2" markerEnd="url(#arrow2)"/>
              <text x="140" y="150" fontSize="12" fill="#38BEC9">Payment & Access</text>
              <defs>
                <marker id="arrow2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#0A2463" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <ul className="space-y-2">
              <li><b>HTTP 402 'Payment Required'</b> response triggers payment flow for API & MCP</li>
              <li>Stablecoin transactions verified via <b>EIP-712 signatures</b> for API & MCP</li>
              <li>Multiple settlement options: on-chain, Layer 2, payment channels for API & MCP</li>
            </ul>
            <div className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
              <b>Developer Note:</b> No blockchain expertise required. We handle the complexity for API & MCP.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Code Sample Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Integration in Minutes for API & MCP</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 bg-slate-900 rounded-xl p-6 text-white font-mono text-sm overflow-x-auto shadow-card">
            <pre className="whitespace-pre-wrap">
{`import { x402Client } from 'x402-sdk';

const client = x402Client({
  endpoint: 'https://api.example.com',
  wallet: myWallet,
});

const result = await client.get('/weather', { city: 'Tokyo' });
console.log(result);
// Handles 402, payment, and access for API & MCP automatically
`}
            </pre>
          </div>
          <div className="flex-1 text-slate-600 dark:text-slate-400">
            Our lightweight client SDK handles wallets, signatures, and 402 responses for API & MCP automatically
          </div>
        </div>
      </section>

      {/* 7. Dual Use Case Display */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Flexible for Any API & MCP Resource</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>API Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Precise per-endpoint pricing based on actual value for API & MCP</p>
              <div className="mt-4 flex gap-2">
                <Badge variant="primary">API</Badge>
                <svg width="24" height="24"><rect x="4" y="8" width="16" height="8" rx="2" fill="#38BEC9" fillOpacity="0.2"/></svg>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>MCP Context Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monetize documents, datasets, and information chunks as MCP</p>
              <div className="mt-4 flex gap-2">
                <Badge variant="accent">MCP</Badge>
                <svg width="24" height="24"><circle cx="12" cy="12" r="8" fill="#FF9F1C" fillOpacity="0.2"/></svg>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8 gap-8">
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><rect x="4" y="8" width="24" height="16" rx="4" fill="#38BEC9" fillOpacity="0.15"/></svg>
            <span className="text-xs mt-2 text-slate-500">API</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><circle cx="16" cy="16" r="12" fill="#FF9F1C" fillOpacity="0.15"/></svg>
            <span className="text-xs mt-2 text-slate-500">MCP</span>
          </div>
        </div>
      </section>

      {/* 8. AI Agent Compatibility */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Built for the AI & MCP Economy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <svg width="40" height="40"><circle cx="20" cy="20" r="18" fill="#38BEC9" fillOpacity="0.12"/></svg>
            <h4 className="font-semibold mt-4 mb-2">AI agent budget management for MCP</h4>
          </div>
          <div className="flex flex-col items-center">
            <svg width="40" height="40"><rect x="8" y="8" width="24" height="24" rx="6" fill="#FF9F1C" fillOpacity="0.12"/></svg>
            <h4 className="font-semibold mt-4 mb-2">Semantic context valuation helpers for MCP</h4>
          </div>
          <div className="flex flex-col items-center">
            <svg width="40" height="40"><rect x="8" y="8" width="24" height="24" rx="12" fill="#0A2463" fillOpacity="0.12"/></svg>
            <h4 className="font-semibold mt-4 mb-2">Autonomous decision support utilities for MCP</h4>
          </div>
        </div>
        <div className="flex justify-center">
          <svg width="120" height="48"><ellipse cx="60" cy="24" rx="56" ry="18" fill="#38BEC9" fillOpacity="0.08"/><ellipse cx="60" cy="24" rx="32" ry="10" fill="#FF9F1C" fillOpacity="0.08"/></svg>
        </div>
      </section>

      {/* 9. Feature Highlights */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Powerful Yet Simple for API & MCP</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><rect x="8" y="8" width="16" height="16" rx="4" fill="#38BEC9" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">Resource Analysis for API & MCP</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><circle cx="16" cy="16" r="12" fill="#FF9F1C" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">Flexible Pricing Models for API & MCP</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><rect x="8" y="8" width="16" height="16" rx="8" fill="#0A2463" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">Revenue Simulation for API & MCP</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><rect x="8" y="8" width="16" height="16" rx="2" fill="#38BEC9" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">x402 Integration for API & MCP</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><circle cx="16" cy="16" r="12" fill="#FF9F1C" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">Real-time Monitoring for API & MCP</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="32" height="32"><rect x="8" y="8" width="16" height="16" rx="4" fill="#0A2463" fillOpacity="0.15"/></svg>
            <span className="mt-2 text-sm">Client SDK for API & MCP</span>
          </div>
        </div>
      </section>

      {/* 10. Pricing Section (Coming Soon) */}
      <section className="max-w-5xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Transparent Pricing</h2>
        <div className="text-lg text-slate-500 dark:text-slate-400">Coming Soon</div>
      </section>

      {/* 11. Social Proof (Coming Soon) */}
      <section className="max-w-5xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Trusted by Innovative Developers</h2>
        <div className="text-lg text-slate-500 dark:text-slate-400">Coming Soon</div>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-8 text-slate-900 dark:text-white">Common Questions</h2>
        <div className="space-y-4">
          {/* シンプルなアコーディオン実装 */}
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">What is x402?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">
              x402 is a micropayment protocol for APIs and MCP resources. It leverages the HTTP 402 status to enable flexible, blockchain-based pay-per-use access. For more details, visit the <a href="https://www.x402.org/" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">official website</a>.
            </div>
          </details>
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">Which blockchains are supported?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">Major EVM chains and Solana.</div>
          </details>
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">How are transaction costs calculated?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">You only pay the blockchain transaction fee and our platform fee (if any).</div>
          </details>
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">Can I integrate with existing APIs?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">Yes, just import your OpenAPI spec or context resource.</div>
          </details>
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">What stablecoins are accepted?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">USDC, USDT, DAI, and more coming soon.</div>
          </details>
          <details className="bg-white dark:bg-slate-900 rounded-lg shadow-card p-4">
            <summary className="font-semibold cursor-pointer">How do AI agents interact with x402?</summary>
            <div className="mt-2 text-slate-600 dark:text-slate-400">Agents can manage budgets, value context, and pay per use autonomously.</div>
          </details>
        </div>
      </section>

      {/* 13. Final CTA Section (Coming Soon) */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Start Monetizing Your Resources</h2>
        <div className="text-lg text-slate-500 dark:text-slate-400">Coming Soon</div>
      </section>

      {/* 14. Footer */}
      <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary-500 text-lg">xFlow</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/docs" className="hover:underline">Docs</a>
            <a href="/blog" className="hover:underline">Blog</a>
            <a href="/support" className="hover:underline">Support</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></a>
            <a href="https://discord.com/" target="_blank" rel="noopener" aria-label="Discord"><svg width="20" height="20" fill="currentColor"><circle cx="10" cy="10" r="10" /></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 