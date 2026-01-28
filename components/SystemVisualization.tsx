'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  type: 'gateway' | 'agent' | 'tool' | 'channel';
  label: string;
  x: number;
  y: number;
  connections: string[];
}

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
}

export default function SystemVisualization() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'gateway',
      type: 'gateway',
      label: 'Gateway',
      x: 50,
      y: 50,
      connections: ['agent1', 'agent2', 'channel1']
    },
    {
      id: 'agent1',
      type: 'agent',
      label: 'Agent 1',
      x: 20,
      y: 80,
      connections: ['gateway', 'tool1']
    },
    {
      id: 'agent2',
      type: 'agent',
      label: 'Agent 2',
      x: 80,
      y: 80,
      connections: ['gateway', 'tool2']
    },
    {
      id: 'channel1',
      type: 'channel',
      label: 'Telegram',
      x: 50,
      y: 20,
      connections: ['gateway']
    },
    {
      id: 'tool1',
      type: 'tool',
      label: 'File Tool',
      x: 10,
      y: 50,
      connections: ['agent1']
    },
    {
      id: 'tool2',
      type: 'tool',
      label: 'Web Tool',
      x: 90,
      y: 50,
      connections: ['agent2']
    }
  ]);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate message flow
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      const connectedNodes = nodes.filter(n => 
        randomNode.connections.includes(n.id) && n.id !== randomNode.id
      );
      
      if (connectedNodes.length > 0) {
        const targetNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
        const newMessage: Message = {
          id: Date.now().toString(),
          from: randomNode.id,
          to: targetNode.id,
          content: `Data transfer from ${randomNode.label}`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev.slice(-4), newMessage]); // Keep only last 5 messages
        
        // Auto-clear messages after 3 seconds
        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== newMessage.id));
        }, 3000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAnimating, nodes]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'gateway': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
      case 'agent': return 'bg-gradient-to-br from-pink-400 to-red-500';
      case 'tool': return 'bg-gradient-to-br from-blue-400 to-cyan-500';
      case 'channel': return 'bg-gradient-to-br from-green-400 to-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'gateway': return '📡';
      case 'agent': return '🤖';
      case 'tool': return '🔧';
      case 'channel': return '💬';
      default: return '❓';
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="system-visualization" ref={containerRef}>
      <div className="controls">
        <button 
          className={`animate-btn ${isAnimating ? 'active' : ''}`}
          onClick={toggleAnimation}
        >
          {isAnimating ? '⏸️ Pause Simulation' : '▶️ Start Simulation'}
        </button>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color bg-gradient-to-br from-purple-500 to-indigo-600"></div>
            <span>Gateway</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-gradient-to-br from-pink-400 to-red-500"></div>
            <span>Agent</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-gradient-to-br from-blue-400 to-cyan-500"></div>
            <span>Tool</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-gradient-to-br from-green-400 to-teal-500"></div>
            <span>Channel</span>
          </div>
        </div>
      </div>
      
      <div className="visualization-container">
        <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.flatMap(node => 
            node.connections
              .filter(connId => {
                const connNode = nodes.find(n => n.id === connId);
                return connNode && node.id < connNode.id; // Only draw once per connection
              })
              .map(connId => {
                const connNode = nodes.find(n => n.id === connId);
                if (!connNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connNode.x}
                    y2={connNode.y}
                    stroke="rgba(100, 100, 100, 0.3)"
                    strokeWidth="0.5"
                  />
                );
              })
          )}
        </svg>
        
        <div className="nodes-container">
          {nodes.map(node => (
            <motion.div
              key={node.id}
              className={`node ${selectedNode === node.id ? 'selected' : ''} ${getNodeColor(node.type)}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              animate={{
                boxShadow: selectedNode === node.id 
                  ? '0 0 20px rgba(255, 255, 255, 0.5)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="node-icon">{getNodeIcon(node.type)}</div>
              <div className="node-label">{node.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="node-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3>Node Details</h3>
            {(() => {
              const node = nodes.find(n => n.id === selectedNode);
              if (!node) return null;
              
              return (
                <div>
                  <p><strong>Type:</strong> {node.type}</p>
                  <p><strong>Label:</strong> {node.label}</p>
                  <p><strong>Connections:</strong> {node.connections.join(', ')}</p>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="message-log">
        <h3>Message Log</h3>
        <div className="messages-container">
          {messages.map(message => (
            <motion.div
              key={message.id}
              className="message-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <span className="message-from">{message.from}</span>
              <span className="message-arrow">→</span>
              <span className="message-to">{message.to}</span>
              <span className="message-content">{message.content}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}