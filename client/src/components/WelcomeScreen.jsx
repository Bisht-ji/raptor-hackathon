import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-screen-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClose}
        >
          <motion.div
            className="welcome-screen-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
          >
            {/* Animated Background Effects */}
            <div className="welcome-bg-effects">
              <div className="welcome-grid" />
              <div className="welcome-gradient-orb welcome-orb-1" />
              <div className="welcome-gradient-orb welcome-orb-2" />
              <div className="welcome-gradient-orb welcome-orb-3" />
            </div>

            {/* Raptor Icon */}
            <motion.div
              className="welcome-raptor-icon"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🦖
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="welcome-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO
            </motion.h1>

            <motion.h2
              className="welcome-hackathon-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              RAPTOR HACKATHON
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="welcome-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Code That Evolves · Reality That Mutates
            </motion.p>

            {/* Creator Credit */}
            <motion.div
              className="welcome-creator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="creator-badge">
                <span className="creator-label">Created by</span>
                <span className="creator-name">Aditya Bisht</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="welcome-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Where Chaos Meets Innovation
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              className="welcome-decorative-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* Click to Continue */}
            <motion.p
              className="welcome-click-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                delay: 1.5,
                duration: 2,
                repeat: Infinity
              }}
            >
              Click anywhere to continue
            </motion.p>

            {/* Animated Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="welcome-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
