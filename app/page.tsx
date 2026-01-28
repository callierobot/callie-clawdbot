'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemVisualization from '../components/SystemVisualization';
import './globals.css';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    { id: 'overview', title: 'Overview', icon: '🌐' },
    { id: 'architecture', title: 'Architecture', icon: '🏗️' },
    { id: 'features', title: 'Features', icon: '✨' },
    { id: 'demo', title: 'Demo', icon: '🎬' },
    { id: 'integration', title: 'Integration', icon: '🔗' },
  ];

  const overviewContent = (
    <div className="content-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hero-section"
      >
        <h1>Discover Clawdbot</h1>
        <p className="subtitle">An intelligent automation platform that bridges the gap between AI and real-world applications.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="visual-overview"
      >
        <SystemVisualization />
      </motion.div>
    </div>
  );

  const architectureContent = (
    <div className="content-section">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="architecture-content"
      >
        <h2>System Architecture</h2>
        <p>Clawdbot follows a modular architecture with clear separation of concerns.</p>
        
        <div className="arch-diagram">
          <div className="layer">
            <h3>Interface Layer</h3>
            <ul>
              <li>Telegram, WhatsApp, Discord</li>
              <li>Web Dashboard</li>
              <li>API Endpoints</li>
            </ul>
          </div>
          
          <div className="layer">
            <h3>Processing Layer</h3>
            <ul>
              <li>Message Routing</li>
              <li>Intent Recognition</li>
              <li>Context Management</li>
            </ul>
          </div>
          
          <div className="layer">
            <h3>Tool Layer</h3>
            <ul>
              <li>File Operations</li>
              <li>Web Browsing</li>
              <li>System Commands</li>
              <li>External APIs</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🐾</span>
          <h1>Clawdbot Explorer</h1>
        </div>
        
        <div className="nav-links">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isLoaded ? { scale: [0, 1] } : {}}
              transition={{ delay: 0.1 * sections.indexOf(section) }}
            >
              <span className="icon">{section.icon}</span>
              <span>{section.title}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'overview' && overviewContent}
            {activeSection === 'architecture' && architectureContent}
            {activeSection === 'features' && (
              <div className="content-section">
                <h2>Key Features</h2>
                <p>Discover the powerful capabilities of Clawdbot.</p>
                
                <div className="features-grid">
                  <motion.div 
                    className="feature-card"
                    whileHover={{ y: -10 }}
                  >
                    <div className="feature-icon">🤖</div>
                    <h3>Intelligent Agents</h3>
                    <p>Autonomous units that can perform complex tasks independently</p>
                  </motion.div>
                  
                  <motion.div 
                    className="feature-card"
                    whileHover={{ y: -10 }}
                  >
                    <div className="feature-icon">🔧</div>
                    <h3>Extensive Toolset</h3>
                    <p>Built-in capabilities for file management, web browsing, and system operations</p>
                  </motion.div>
                  
                  <motion.div 
                    className="feature-card"
                    whileHover={{ y: -10 }}
                  >
                    <div className="feature-icon">🌐</div>
                    <h3>Cross-Platform</h3>
                    <p>Connect multiple communication channels in one unified interface</p>
                  </motion.div>
                </div>
              </div>
            )}
            {activeSection === 'demo' && (
              <div className="content-section">
                <h2>Interactive Demo</h2>
                <p>Try out the core functionality of Clawdbot in this simulated environment.</p>
                
                <div className="demo-container">
                  <div className="chat-simulation">
                    <div className="message user">
                      <p>Tell me about Clawdbot's capabilities</p>
                    </div>
                    <div className="message bot">
                      <p>Clawdbot is an intelligent automation platform that can help you with file management, web research, system operations, and more!</p>
                    </div>
                  </div>
                  
                  <div className="demo-controls">
                    <button className="demo-btn">Try Command</button>
                    <button className="demo-btn">Explore Tools</button>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'integration' && (
              <div className="content-section">
                <h2>Easy Integration</h2>
                <p>Connect Clawdbot to your preferred platforms and services.</p>
                
                <div className="integration-options">
                  <div className="integration-card">
                    <div className="integration-icon">💬</div>
                    <h3>Chat Platforms</h3>
                    <ul>
                      <li>Telegram</li>
                      <li>WhatsApp</li>
                      <li>Discord</li>
                      <li>Slack</li>
                    </ul>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-icon">💾</div>
                    <h3>Storage</h3>
                    <ul>
                      <li>Local File System</li>
                      <li>Cloud Storage</li>
                      <li>Database Systems</li>
                    </ul>
                  </div>
                  
                  <div className="integration-card">
                    <div className="integration-icon">⚙️</div>
                    <h3>System Tools</h3>
                    <ul>
                      <li>Command Execution</li>
                      <li>Process Management</li>
                      <li>Automation Scripts</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}