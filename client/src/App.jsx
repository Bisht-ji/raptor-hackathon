import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EditorPage from './pages/EditorPage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#00ff00',
              border: '1px solid #00ff00',
              fontFamily: 'JetBrains Mono, monospace'
            }
          }}
        />
        <Routes>
          <Route path="/" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
