'use client'

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getTranscript = async () => {
    if (!url) {
      setError('Please input YouTube URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get transcript');
      }
      
      const data = await response.json();
      console.log('===>data:', JSON.stringify(data));
      setTranscript(JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <h1 className="text-2xl font-bold">YouTube Transcript Extractor</h1>
        
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Input YouTube video URL"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={getTranscript}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Getting...' : 'Get Transcript'}
            </button>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          {transcript && (
            <div className="mt-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Transcript:</h2>
                <span className="text-sm text-gray-500">
                  {transcript.length} characters
                </span>
              </div>
              <div className="relative">
                <textarea
                  readOnly
                  value={transcript}
                  className="w-full h-[400px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg 
                    border border-gray-200 dark:border-gray-700
                    font-mono text-sm resize-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
