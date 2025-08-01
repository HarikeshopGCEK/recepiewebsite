'use client';

import { useState, useRef, useEffect } from 'react';


export default function Home() {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);
  const maxFileSize = 10 * 1024 * 1024; // 10MB for recipe images

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processRecipeImage(file);
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
      processRecipeImage(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processRecipeImage = (file) => {
    if (file.size > maxFileSize) {
      setErrorMessage(`Image too large. Maximum size is ${formatFileSize(maxFileSize)}`);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file (JPG, PNG, GIF)');
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

    setCurrentRecipe(file);
  };



  const clearRecipe = () => {
    setCurrentRecipe(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file) => {
    if (!file) return '🍽️';

    const type = file.type;
    if (type.startsWith('image/')) return '📸';
    return '🍽️';
  };

  const renderRecipePreview = () => {
    if (!currentRecipe) return null;

    const fileType = currentRecipe.type;

    if (fileType.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(currentRecipe)}
          alt="Recipe preview"
          style={{ maxWidth: '100%', borderRadius: '12px' }}
        />
      );
    }

    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#b8c6db' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
        <p>Recipe image preview</p>
        <p>File: {currentRecipe.name}</p>
        <p>Size: {formatFileSize(currentRecipe.size)}</p>
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
          --primary-gradient: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
          --secondary-gradient: linear-gradient(135deg, #48dbfb 0%, #0abde3 100%);
          --accent-gradient: linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%);
          --dark-bg: #2c3e50;
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
            radial-gradient(circle at 20% 80%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(254, 202, 87, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(72, 219, 251, 0.2) 0%, transparent 50%);
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
          background: rgba(44, 62, 80, 0.9);
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
          background: linear-gradient(135deg, #ffffff 0%, #ff6b6b 50%, #feca57 100%);
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
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.4);
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
          margin-bottom: 2rem;
        }

        .upload-zone.dragover {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
          transform: scale(1.02);
        }

        .upload-zone:hover {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.05);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.2);
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
          box-shadow: 0 15px 30px rgba(72, 219, 251, 0.4);
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
          box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3);
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
          border-color: rgba(255, 107, 107, 0.3);
          box-shadow: 0 25px 50px rgba(255, 107, 107, 0.2);
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
          <div className="logo">RecipeHub</div>
          <nav className="nav">
            <a onClick={() => window.location.href = '/my-recipies'}>Browse Recipes</a>
            <a onClick={() => window.location.href = '/my-recipies-submision'}>Submit Recipe</a>
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
              <h1>Share Your Culinary Creations</h1>
              <p>Join our community of food enthusiasts! Submit your favorite recipes, discover new dishes, and connect with fellow cooking lovers. Your next masterpiece is just a click away.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="cta-button" onClick={() => window.location.href = '/my-recipies'}>
                  <span>Browse Recipes</span>
                  <span>→</span>
                </button>
                <button
                  className="cta-button"
                  style={{ background: 'var(--secondary-gradient)' }}
                  onClick={() => window.location.href = '/my-recipies-submision'}
                >
                  <span>Submit Recipe</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="upload-section" id="upload">
          <div className="container">
            <div className="section-header">
              <h2>Discover Amazing Recipes</h2>
              <p>Explore thousands of delicious recipes from around the world, shared by our passionate community of food lovers.</p>
            </div>

            <div className="upload-container">
              <div className="upload-zone">
                <div className="upload-icon">🍽️</div>
                <div className="upload-text">Browse Recipes</div>
                <div className="upload-subtext">Discover new dishes, cooking tips, and culinary inspiration</div>
                <button className="upload-btn">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose RecipeHub?</h2>
              <p>Join thousands of food lovers sharing their passion for cooking and discovering amazing recipes.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">👨‍🍳</div>
                <h3>Share Your Expertise</h3>
                <p>Whether you're a seasoned chef or a home cook, share your unique recipes and cooking techniques with our community.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📸</div>
                <h3>Beautiful Photos</h3>
                <p>Showcase your culinary creations with high-quality photos that will make everyone's mouth water.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Community</h3>
                <p>Connect with food enthusiasts from around the world and discover recipes from different cultures and traditions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⭐</div>
                <h3>Rate & Review</h3>
                <p>Get feedback on your recipes and help others by rating and reviewing the dishes you try.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Easy Discovery</h3>
                <p>Find exactly what you're looking for with our advanced search and filtering options.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile Friendly</h3>
                <p>Submit and browse recipes on any device with our responsive design and mobile-optimized interface.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 RecipeHub. Connect with food lovers worldwide and share your culinary passion.</p>
        </div>
      </footer>
    </>
  );
}  
