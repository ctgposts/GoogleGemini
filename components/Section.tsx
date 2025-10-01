
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  actions?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', animationClass = 'animate-luxury-fade', actions }) => {
  return (
    <section className={`bg-white/40 backdrop-blur-md border border-luxury-gold/20 rounded-xl p-6 mb-8 ${animationClass} ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-oswald text-luxury-gold">{title}</h2>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Section;