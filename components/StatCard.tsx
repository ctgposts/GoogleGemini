
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  colorClass: string;
  animationClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, colorClass, animationClass = 'animate-velvet-slide' }) => {
  return (
    <div className={`relative overflow-hidden bg-white/50 p-6 rounded-lg shadow-lg border-l-4 ${colorClass} ${animationClass}`}>
      <div className="flex items-center">
        <div className="mr-4 text-3xl opacity-80">{icon}</div>
        <div>
          <p className="text-sm text-luxury-dark-text/80 uppercase font-oswald">{title}</p>
          <p className="text-2xl font-bold text-luxury-dark-text">{value}</p>
        </div>
      </div>
      <div className={`absolute -bottom-4 -right-4 text-6xl opacity-10`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;