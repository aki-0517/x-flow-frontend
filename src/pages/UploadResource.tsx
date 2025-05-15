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

  const analyzeFile = () => {
    // In a real app, this would send the file for processing
    console.log(`Analyzing ${resourceType} file:`, uploadedFile || apiSpecContent);
    // Navigate to pricing page after analysis
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
    </div>
  );
};

export default UploadResource;