import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Code, FileText, CheckCircle, X, Eye, Edit } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import yaml from 'js-yaml';

const UploadResource: React.FC = () => {
  const [resourceType, setResourceType] = useState<'api' | 'context'>('api');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [apiSpecContent, setApiSpecContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [analyzedEndpoints, setAnalyzedEndpoints] = useState<any[]>([]);
  const [showPricing, setShowPricing] = useState(false);
  const [pricingConfig, setPricingConfig] = useState<any>({});
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      // Simulate uploading process
      setUploadStatus('uploading');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setApiSpecContent(event.target.result as string);
          setUploadStatus('success');
        }
      };
      reader.onerror = () => {
        setUploadStatus('error');
      };
      reader.readAsText(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: resourceType === 'api' 
      ? { 'application/yaml': ['.yaml', '.yml'], 'application/json': ['.json'] }
      : { 'text/plain': ['.txt'], 'application/pdf': ['.pdf'], 'text/markdown': ['.md'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }
  });

  const removeFile = () => {
    setUploadedFile(null);
    setApiSpecContent('');
    setUploadStatus('idle');
  };

  function parseOpenApiEndpoints(apiSpecContent: string) {
    let spec;
    try {
      spec = apiSpecContent.trim().startsWith('{')
        ? JSON.parse(apiSpecContent)
        : yaml.load(apiSpecContent);
    } catch (e) {
      return [];
    }
    if (!spec.paths) return [];
    const endpoints = [];
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [method, details] of Object.entries(methods as any)) {
        const d = details as any;
        endpoints.push({
          path,
          method: method.toUpperCase(),
          summary: d.summary || '',
          parameters: d.parameters || [],
          responses: d.responses || {},
        });
      }
    }
    return endpoints;
  }

  const analyzeFile = () => {
    const endpoints = parseOpenApiEndpoints(apiSpecContent);
    setAnalyzedEndpoints(endpoints);
    setShowPricing(true);
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApiSpecContent(e.target.value);
  };

  // Swagger UIでOpenAPIプレビュー
  const SwaggerPreview = () => (
    <div className="h-[400px] overflow-auto bg-white dark:bg-slate-800 p-4 rounded border">
      {apiSpecContent ? (
        <SwaggerUI spec={(() => {
          try {
            // JSONならそのまま、YAMLならパース
            if (apiSpecContent.trim().startsWith('{')) {
              return JSON.parse(apiSpecContent);
            } else {
              return yaml.load(apiSpecContent);
            }
          } catch (e) {
            return { info: { title: 'パースエラー', description: 'OpenAPI定義のパースに失敗しました' } };
          }
        })()} />
      ) : (
        <div className="text-center p-4">
          <h3 className="text-xl font-bold">API Documentation Preview</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            エディタにOpenAPI仕様を入力するとプレビューが表示されます
          </p>
        </div>
      )}
    </div>
  );

  // WalletリストはlocalStorageまたはwindow経由で取得（簡易例: window.wallets）
  const getWallets = () => {
    // window.walletsがなければデフォルト
    return (window as any).wallets || [
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0x3A9d753d77935b8d15411464A0e6E52fA0fbB31D',
    ];
  };

  function PricingConfigForm({ endpoints, config, setConfig, onSave }: any) {
    if (!endpoints.length) return <div>No endpoints found</div>;
    // Pricing options definition
    const priceOptions = [
      {
        key: 'fixedPrice',
        label: 'Fixed Price (per call)',
        placeholder: 'e.g. 0.01',
        type: 'number',
        description: 'Set a fixed price per call. (Resource type, priority, access level can be set below)'
      },
      {
        key: 'variablePrice',
        label: 'Variable Price (data/processing)',
        placeholder: 'e.g. 0.001/KB',
        type: 'number',
        description: 'Set a variable price based on data size, processing time, etc.'
      },
      {
        key: 'tieredPrice',
        label: 'Tiered Pricing (discount/tier)',
        placeholder: 'e.g. 10% off after 100 calls/month',
        type: 'text',
        description: 'Set discounts or tiers based on usage frequency, commitment, user tier, etc.'
      },
      {
        key: 'complexityFactor',
        label: 'Request Complexity Factor',
        placeholder: 'e.g. param count x 0.01',
        type: 'text',
        description: 'Set a multiplier based on algorithm, accuracy, preprocessing, customization, etc.'
      },
      {
        key: 'agentPricing',
        label: 'Agent-Specific Pricing',
        placeholder: 'e.g. agentA=0.01, agentB=0.02',
        type: 'text',
        description: 'Set custom pricing for agent ID/class, learning factor, collaboration discount, etc.'
      },
      {
        key: 'advancedOptions',
        label: 'Advanced Pricing Options',
        placeholder: 'e.g. market-based, bundle, subscription',
        type: 'text',
        description: 'Set dynamic market price, bundle discount, subscription, reserved capacity, etc.'
      },
    ];
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4">API Pricing Configuration</h2>
        {endpoints.map((ep: any) => (
          <div key={ep.path + ep.method} className="border rounded-lg p-4 mb-4 bg-slate-50">
            <div className="font-mono text-sm mb-2">
              <span className="font-bold">[{ep.method}]</span> {ep.path}
              {ep.summary && <span className="ml-2 text-slate-500 dark:text-slate-400">// {ep.summary}</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceOptions.map(opt => {
                const active = !!config[ep.path+ep.method]?.[opt.key+'Active'];
                return (
                  <div key={opt.key} className={opt.key === 'advancedOptions' || opt.key === 'agentPricing' ? 'md:col-span-2' : ''}>
                    {!active ? (
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded border border-primary-300 w-full text-left mb-2"
                        onClick={() => setConfig((prev: any) => ({
                          ...prev,
                          [ep.path+ep.method]: {
                            ...prev[ep.path+ep.method],
                            [opt.key+'Active']: true
                          }
                        }))}
                      >
                        <span className="text-xs font-normal">+ Add</span> <span className="font-bold text-base">{opt.label}</span>
                      </button>
                    ) : (
                      <div className="border-2 border-primary-400 rounded p-3 bg-white mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-bold text-base">{opt.label}</label>
                          <button
                            type="button"
                            className="text-xs text-red-500 hover:underline ml-2"
                            onClick={() => setConfig((prev: any) => ({
                              ...prev,
                              [ep.path+ep.method]: {
                                ...prev[ep.path+ep.method],
                                [opt.key+'Active']: false,
                                [opt.key]: ''
                              }
                            }))}
                          >
                            Remove
                          </button>
                        </div>
                        {opt.type === 'number' ? (
                          (() => {
                            // 値の変化を監視してデバッグ出力
                            React.useEffect(() => {
                              console.log('input value:', config[ep.path+ep.method]?.[opt.key] ?? '');
                            }, [config[ep.path+ep.method]?.[opt.key]]);
                            return (
                              <input
                                type="text"
                                inputMode="decimal"
                                pattern="^\\d*\\.?\\d*$"
                                className="input mt-1 w-full"
                                placeholder={opt.placeholder}
                                value={
                                  config[ep.path+ep.method]?.[opt.key] !== undefined &&
                                  config[ep.path+ep.method]?.[opt.key] !== null
                                    ? config[ep.path+ep.method][opt.key]
                                    : ''
                                }
                                onChange={e => {
                                  const val = e.target.value;
                                  // 数字と小数点のみ許可
                                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                                    setConfig((prev: any) => {
                                      const prevEp = prev[ep.path+ep.method] || {};
                                      return {
                                        ...prev,
                                        [ep.path+ep.method]: {
                                          ...prevEp,
                                          [opt.key]: val ?? ''
                                        }
                                      };
                                    });
                                  }
                                }}
                              />
                            );
                          })()
                        ) : (
                          <input
                            type="text"
                            className="input mt-1 w-full"
                            placeholder={opt.placeholder}
                            value={config[ep.path+ep.method]?.[opt.key] ?? ''}
                            onChange={e => {
                              const val = e.target.value;
                              setConfig((prev: any) => ({
                                ...prev,
                                [ep.path+ep.method]: {
                                  ...prev[ep.path+ep.method],
                                  [opt.key]: val
                                }
                              }));
                            }}
                          />
                        )}
                        <div className="text-xs text-slate-500 mt-1">{opt.description}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <Button onClick={() => onSave(config)} className="w-40">Select Wallet</Button>
        </div>
      </div>
    );
  }

  // Wallet選択モーダル
  function WalletSelectModal({ onSelect, onCancel }: { onSelect: (addr: string) => void, onCancel: () => void }) {
    const wallets = getWallets();
    const [selected, setSelected] = useState(wallets[0] || '');
    return (
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 className="text-lg font-bold mb-4">Select Wallet</h2>
          <div className="space-y-2 mb-4">
            {wallets.map((addr: string) => (
              <label key={addr} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="wallet"
                  value={addr}
                  checked={selected === addr}
                  onChange={() => setSelected(addr)}
                />
                <span className="font-mono text-xs">{addr}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSelect(selected)} disabled={!selected}>Review & Publish</Button>
          </div>
        </div>
      </div>
    );
  }

  // 最終確認モーダル
  function FinalConfirmModal({ onPublish, onCancel }: { onPublish: () => void, onCancel: () => void }) {
    return (
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-lg w-full p-6">
          <h2 className="text-lg font-bold mb-4">Review & Publish</h2>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Pricing Configuration</h3>
            <pre className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-xs overflow-x-auto max-h-40">{JSON.stringify(pricingConfig, null, 2)}</pre>
            <h3 className="font-semibold mt-4 mb-2">Wallet Address</h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-2 font-mono text-xs">{selectedWallet}</div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onCancel}>Back</Button>
            <Button onClick={onPublish}>Publish</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Upload Resource</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Upload your API specification or context resource for monetization
        </p>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={resourceType === 'api' ? 'primary' : 'secondary'}
          leftIcon={<Code size={16} />}
          onClick={() => setResourceType('api')}
        >
          API Resource
        </Button>
        <Button
          variant={resourceType === 'context' ? 'primary' : 'secondary'}
          leftIcon={<FileText size={16} />}
          onClick={() => setResourceType('context')}
        >
          Context Resource
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {resourceType === 'api' ? 'API Specification Upload' : 'Context Resource Upload'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {resourceType === 'api'
                    ? 'Upload or edit your OpenAPI (Swagger) specification in YAML or JSON format'
                    : 'Upload text files, documents, datasets, or other context resources'}
                </p>
              </div>

              {resourceType === 'api' ? (
                <div>
                  {uploadStatus === 'uploading' ? (
                    <div className="border rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-medium">Processing...</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">This may take a moment</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex border-b mb-4">
                        <button
                          className={`px-4 py-2 flex items-center ${
                            activeTab === 'editor'
                              ? 'border-b-2 border-primary-500 text-primary-500'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          onClick={() => setActiveTab('editor')}
                        >
                          <Edit size={16} className="mr-2" />
                          Editor
                        </button>
                        <button
                          className={`px-4 py-2 flex items-center ${
                            activeTab === 'preview'
                              ? 'border-b-2 border-primary-500 text-primary-500'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          onClick={() => setActiveTab('preview')}
                        >
                          <Eye size={16} className="mr-2" />
                          Preview
                        </button>
                      </div>

                      {activeTab === 'editor' ? (
                        <div>
                          <textarea
                            className="w-full h-[400px] p-4 font-mono text-sm border rounded-lg bg-slate-50 dark:bg-slate-900"
                            value={apiSpecContent}
                            onChange={handleEditorChange}
                            placeholder="# Write your OpenAPI specification here or drag and drop a file"
                          />
                          <div className="mt-2 flex justify-end items-center">
                            <div
                              {...getRootProps()}
                              className="cursor-pointer text-sm text-primary-500 hover:text-primary-700 flex items-center mr-4"
                            >
                              <input {...getInputProps()} />
                              <Upload size={16} className="mr-1" />
                              Upload File
                            </div>
                            {apiSpecContent && (
                              <Button variant="ghost" size="sm" onClick={removeFile}>
                                <X size={16} className="mr-1" />
                                Clear
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <SwaggerPreview />
                      )}

                      {apiSpecContent && (
                        <div className="mt-4">
                          <Button onClick={analyzeFile} className="w-full">
                            Analyze API Specification
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <>
                  {uploadStatus === 'idle' && (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-slate-300 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-4 text-sm font-medium">
                        {isDragActive
                          ? 'Drop the file here...'
                          : 'Drag and drop your file here, or click to browse'}
                      </p>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Supported formats: TXT, PDF, MD, DOC, CSV, JSON (maximum 50MB)
                      </p>
                    </div>
                  )}

                  {uploadStatus === 'uploading' && (
                    <div className="border rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-medium">Uploading file...</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">This might take a moment</p>
                      </div>
                    </div>
                  )}

                  {(uploadStatus === 'success' || uploadStatus === 'error') && uploadedFile && (
                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          {uploadStatus === 'success' ? (
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-success-100 dark:bg-success-900/30">
                              <CheckCircle className="h-5 w-5 text-success-500" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-error-100 dark:bg-error-900/30">
                              <X className="h-5 w-5 text-error-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {(uploadedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={removeFile}>
                          <X size={16} />
                        </Button>
                      </div>
                      
                      {uploadStatus === 'success' && (
                        <div className="mt-4">
                          <Button onClick={analyzeFile} className="w-full">
                            Analyze Context Resource
                          </Button>
                        </div>
                      )}
                      
                      {uploadStatus === 'error' && (
                        <div className="mt-4 p-3 bg-error-50 dark:bg-error-900/30 rounded-lg text-error-700 dark:text-error-300 text-sm">
                          There was an error processing your file. Please check the format and try again.
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                <h3 className="text-sm font-medium">What happens next?</h3>
                <ol className="mt-2 text-sm text-slate-500 dark:text-slate-400 space-y-2 pl-5 list-decimal">
                  <li>
                    We'll analyze your {resourceType === 'api' ? 'API structure' : 'context resource'} 
                    and extract key information
                  </li>
                  <li>
                    You'll be able to review and configure pricing for each 
                    {resourceType === 'api' ? ' endpoint' : ' resource component'}
                  </li>
                  <li>Set up your wallet address to receive payments</li>
                  <li>Publish your resource with the x402 payment protocol enabled</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {showPricing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <PricingConfigForm
              endpoints={analyzedEndpoints}
              config={pricingConfig}
              setConfig={setPricingConfig}
              onSave={() => { setShowPricing(false); setShowWalletSelect(true); }}
            />
          </div>
        </div>
      )}
      {showWalletSelect && (
        <WalletSelectModal
          onSelect={addr => { setSelectedWallet(addr); setShowWalletSelect(false); setShowFinalConfirm(true); }}
          onCancel={() => { setShowWalletSelect(false); setShowPricing(true); }}
        />
      )}
      {showFinalConfirm && (
        <FinalConfirmModal
          onPublish={() => { setShowFinalConfirm(false); alert('Published!'); }}
          onCancel={() => { setShowFinalConfirm(false); setShowWalletSelect(true); }}
        />
      )}
    </div>
  );
};

export default UploadResource;