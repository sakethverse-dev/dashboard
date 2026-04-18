import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  count?: number | string;
  description?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, count, description, onClick, className, children, style }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`glass glass-hover p-6 cursor-pointer flex flex-col items-center text-center transition-all ${className}`}
      onClick={onClick}
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        ...style
      }}
    >
      <div className="p-4 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--accent-neon)' }}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        {count !== undefined && (
          <p className="text-3xl font-bold" style={{ color: 'var(--accent-neon)', margin: '0.5rem 0' }}>
            {count}
          </p>
        )}
        {description && (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
};

export default Card;
