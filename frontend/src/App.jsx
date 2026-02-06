import axios from 'axios';
import Markdown from 'react-markdown';
import './App.css'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import Editor from 'react-simple-code-editor';
import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';

function App() {
  const [code, setCode] = useState(`function Sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    setReview('');
    try {
      // Use relative API path so it works both locally (via Vite proxy) and on Vercel (`/api` routes)
      const response = await axios.post('/api/ai/get-review', { code });
      setReview(response.data.response);
    } catch (error) {
      setReview('**Error:** Unable to get review. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">
              <span className="logo-bracket">{"<"}</span>
              <span className="logo-text">CodeReview</span>
              <span className="logo-bracket">{"/>"}</span>
            </h1>
            <p className="tagline">AI-Powered Code Analysis</p>
          </div>
        </header>

        <main className="main-content">
          <div className="editor-panel">
            <div className="panel-header">
              <div className="panel-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Your Code</span>
              </div>
              <button 
                className={`review-button ${isLoading ? 'loading' : ''}`}
                onClick={reviewCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2L10 6L14 7L11 10L12 14L8 12L4 14L5 10L2 7L6 6L8 2Z" 
                            fill="currentColor"/>
                    </svg>
                    Review Code
                  </>
                )}
              </button>
            </div>
            <div className="code-editor">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                padding={20}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  lineHeight: 1.6,
                  height: '100%',
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: 'transparent',
                }}
              />
            </div>
          </div>

          <div className="review-panel">
            <div className="panel-header">
              <div className="panel-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M8 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
                </svg>
                <span>AI Review</span>
              </div>
            </div>
            <div className="review-content">
              {review ? (
                <Markdown>{review}</Markdown>
              ) : (
                <div className="empty-state">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                    <path d="M20 32L28 40L44 24" stroke="currentColor" strokeWidth="3" 
                          strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  </svg>
                  <h3>Ready to review your code</h3>
                  <p>Click the "Review Code" button to get AI-powered insights and suggestions</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App