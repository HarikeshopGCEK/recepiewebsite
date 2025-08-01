'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [currentFile, setCurrentFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fileInputRef = useRef(null);
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = (file) => {
    if (file.size > maxFileSize) {
      setErrorMessage(`File too large. Maximum size is ${formatFileSize(maxFileSize)}`);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    setCurrentFile(file);
  };

  const downloadFile = () => {
    if (currentFile) {
      const url = URL.createObjectURL(currentFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const clearFile = () => {
    setCurrentFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file) => {
    if (!file) return '📄';
    
    const type = file.type;
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📕';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📈';
    if (type.includes('text') || type.includes('code')) return '📄';
    if (type.includes('zip') || type.includes('archive')) return '📦';
    return '📄';
  };

  const renderFilePreview = () => {
    if (!currentFile) return null;

    const fileType = currentFile.type;
    
    if (fileType.startsWith('image/')) {
      return (
        <img 
          src={URL.createObjectURL(currentFile)} 
          alt={currentFile.name}
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
      );
    }
    
    if (fileType.startsWith('text/') || fileType.includes('code')) {
      return (
        <pre style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          color: '#e2e8f0',
          lineHeight: 1.6,
          fontFamily: 'JetBrains Mono, Fira Code, monospace'
        }}>
          {currentFile.name} - {formatFileSize(currentFile.size)}
        </pre>
      );
    }
    
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#b8c6db' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
        <p>Preview not available for this file type</p>
        <p>File: {currentFile.name}</p>
        <p>Size: {formatFileSize(currentFile.size)}</p>
        <p>Type: {currentFile.type || 'Unknown'}</p>
      </div>
    );
  };

  const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --dark-bg: #0a0e27;
          --card-bg: rgba(255, 255, 255, 0.05);
          --border-color: rgba(255, 255, 255, 0.1);
          --text-primary: #ffffff;
          --text-secondary: #b8c6db;
          --text-muted: #8892b0;
          --success-color: #10b981;
          --error-color: #ef4444;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--dark-bg);
          color: var(--text-primary);
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
          z-index: -1;
          animation: bgShift 20s ease-in-out infinite;
        }

        @keyframes bgShift {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 14, 39, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 800;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .logo::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-gradient);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .logo:hover::after {
          transform: scaleX(1);
        }

        .nav {
          display: flex;
          gap: 2.5rem;
        }

        .nav a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav a:hover {
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .nav a::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--accent-gradient);
          transition: width 0.3s ease;
        }

        .nav a:hover::before {
          width: 100%;
        }

        .hero {
          padding: 12rem 0 8rem;
          text-align: center;
          position: relative;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero h1 {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #667eea 50%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          animation: slideInUp 1s ease-out;
        }

        .hero p {
          font-size: 1.3rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto 3rem;
          animation: slideInUp 1s ease-out 0.2s both;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary-gradient);
          color: white;
          text-decoration: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: slideInUp 1s ease-out 0.4s both;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .upload-section {
          padding: 4rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .upload-container {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 3rem;
          position: relative;
          overflow: hidden;
          animation: fadeInScale 0.8s ease-out;
        }

        .upload-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-gradient);
          transform: scaleX(0);
          animation: expandWidth 2s ease-out 0.5s both;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandWidth {
          to { transform: scaleX(1); }
        }

        .upload-zone {
          border: 2px dashed var(--border-color);
          border-radius: 16px;
          padding: 4rem 2rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.02);
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .upload-zone.dragover {
          border-color: #4facfe;
          background: rgba(79, 172, 254, 0.1);
          transform: scale(1.02);
        }

        .upload-zone:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.05);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .upload-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 2rem;
          background: var(--primary-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          position: relative;
          z-index: 2;
          animation: bounceIn 1s ease-out 0.6s both;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .upload-text {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .upload-subtext {
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          position: relative;
          z-index: 2;
        }

        .file-input {
          display: none;
        }

        .upload-btn {
          background: var(--secondary-gradient);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .upload-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(240, 147, 251, 0.4);
        }

        .file-preview {
          margin-top: 3rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          animation: slideInFromBottom 0.6s ease-out;
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .file-header {
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .file-icon {
          width: 60px;
          height: 60px;
          background: var(--accent-gradient);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          animation: rotateIn 0.5s ease-out;
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        .file-details h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .file-details p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .file-actions {
          margin-left: auto;
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          background: var(--primary-gradient);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 15px rgba(102, 126, 234, 0.3);
        }

        .file-content {
          padding: 2rem;
          max-height: 500px;
          overflow-y: auto;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin: 1rem 0;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .message {
          padding: 1rem 1.5rem;
          border-radius: 12px;
          margin: 1rem 0;
          font-weight: 500;
          animation: slideInFromTop 0.4s ease-out;
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.success {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--success-color);
        }

        .message.error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--error-color);
        }

        .features {
          padding: 8rem 0;
          position: relative;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-top: 4rem;
        }

        .feature-card {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--primary-gradient);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.2);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: var(--accent-gradient);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1.05rem;
        }

        footer {
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid var(--border-color);
          padding: 3rem 0;
          text-align: center;
          margin-top: 8rem;
        }

        footer p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
          
          .header-content {
            padding: 1rem;
          }
          
          .nav {
            display: none;
          }
          
          .hero {
            padding: 10rem 0 6rem;
          }
          
          .upload-container {
            padding: 2rem 1rem;
          }
          
          .upload-zone {
            padding: 3rem 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .feature-card {
            padding: 2rem;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--primary-gradient);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent-gradient);
        }
      `}</style>

      <header>
        <div className="header-content">
          <div className="logo">FileVault Pro</div>
          <nav className="nav">
            <a onClick={smoothScroll} href="#upload">Upload</a>
            <a onClick={smoothScroll} href="#features">Features</a>
            <a onClick={smoothScroll} href="#about">About</a>
            <a onClick={smoothScroll} href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Advanced File Management</h1>
              <p>Experience the next generation of file handling with our professional-grade platform. Upload, preview, and manage any file type with enterprise-level security and lightning-fast performance.</p>
              <button className="cta-button" onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>Get Started</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="upload-section" id="upload">
          <div className="container">
            <div className="section-header">
              <h2>Upload & Preview</h2>
              <p>Drag and drop any file or click to browse. Our intelligent system will automatically detect and preview your content.</p>
            </div>

            <div className="upload-container">
              {showSuccess && (
                <div className="message success">
                  ✅ File uploaded successfully!
                </div>
              )}
              {showError && (
                <div className="message error">
                  ❌ {errorMessage}
                </div>
              )}

              <div 
                className={`upload-zone ${isDragging ? 'dragover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">📁</div>
                <div className="upload-text">Drop your files here</div>
                <div className="upload-subtext">Supports all file types • Max size: 50MB</div>
                <button className="upload-btn">
                  Choose Files
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="file-input" 
                  accept="*/*" 
                  onChange={handleFileSelect}
                />
              </div>

              {uploadProgress > 0 && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {currentFile && (
                <div className="file-preview">
                  <div className="file-header">
                    <div className="file-icon">{getFileIcon(currentFile)}</div>
                    <div className="file-details">
                      <h3>{currentFile.name}</h3>
                      <p>{formatFileSize(currentFile.size)} • {currentFile.type || 'Unknown type'}</p>
                    </div>
                    <div className="file-actions">
                      <button className="action-btn" onClick={downloadFile}>Download</button>
                      <button className="action-btn" onClick={clearFile}>Clear</button>
                    </div>
                  </div>
                  <div className="file-content">
                    {renderFilePreview()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <div className="section-header">
              <h2>Powerful Features</h2>
              <p>Everything you need for professional file management in one comprehensive platform.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast Processing</h3>
                <p>Advanced algorithms ensure instant file processing and preview generation, even for large files up to 50MB.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Enterprise Security</h3>
                <p>All files are processed locally in your browser with zero server transmission, ensuring complete data privacy and security.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Universal Compatibility</h3>
                <p>Support for images, documents, videos, audio files, code, and more with intelligent preview generation.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Detailed Analytics</h3>
                <p>Comprehensive file metadata analysis including size, type, dimensions, and technical specifications.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Cross-Platform</h3>
                <p>Works seamlessly across all devices and browsers with responsive design and progressive web app capabilities.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Modern Interface</h3>
                <p>Beautifully crafted user experience with smooth animations, dark theme, and intuitive interactions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 FileVault Pro. Professional file management platform built with cutting-edge web technologies.</p>
        </div>
      </footer>
    </>
  );
}  
