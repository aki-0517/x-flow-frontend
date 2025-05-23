import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { sepolia, baseSepolia } from '@reown/appkit/networks';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: 'xFlow API Market',
  description: 'x402 API Market Demo',
  url: window.location.origin,
  icons: [],
};

const networks = [sepolia, baseSepolia] as [typeof sepolia, typeof baseSepolia];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export { wagmiAdapter, queryClient }; 