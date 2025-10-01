import React from 'react';
import { User, UserRole, NavLink } from '../types';

import {
  HomeIcon,
  MoonIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  user: User;
  activeComponent: string;
  setActiveComponent: (component: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

// Fix: Use a lookup type to ensure consistency and resolve potential type resolution errors.
const iconMap: { [key: string]: NavLink['icon'] } = {
  Dashboard: HomeIcon,
  'Umrah Module': MoonIcon,
  Reports: ChartBarIcon,
  Settings: Cog6ToothIcon,
};


const navLinks: { [key in UserRole]: string[] } = {
  [UserRole.Admin]: ['Dashboard', 'Umrah Module', 'Reports', 'Settings'],
  [UserRole.Manager]: ['Dashboard', 'Umrah Module', 'Reports'],
  [UserRole.Staff]: ['Dashboard', 'Umrah Module'],
};

const Sidebar: React.FC<SidebarProps> = ({ user, activeComponent, setActiveComponent, isSidebarOpen, setIsSidebarOpen }) => {
  const links = navLinks[user.role];

  const handleLinkClick = (link: string) => {
    setActiveComponent(link);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <aside className={`fixed top-0 left-0 w-64 h-full bg-white/30 backdrop-blur-md border-r border-luxury-gold/20 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex items-center justify-between h-24 border-b border-luxury-gold/20 px-4">
        <div className="flex items-center">
          <MoonIcon className="h-8 w-8 text-luxury-gold animate-glow" />
          <h1 className="text-2xl font-oswald text-luxury-gold ml-2">UMRAH-SYS</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-luxury-dark-text p-2">
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
      <div className="p-4 border-b border-luxury-gold/20">
        <p className="text-luxury-dark-text text-center text-lg">{user.name}</p>
        <p className="text-luxury-bronze text-center text-sm font-oswald">{user.role}</p>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {links.map((link) => {
            const Icon = iconMap[link];
            const isActive = activeComponent === link;
            return (
              <li key={link} className="mb-2">
                <button
                  onClick={() => handleLinkClick(link)}
                  className={`w-full flex items-center p-3 rounded-lg text-left transition-all duration-300 group ${
                    isActive
                      ? 'bg-luxury-gold text-luxury-dark-bg shadow-lg animate-glow'
                      : 'text-luxury-dark-text hover:bg-luxury-gold/20 hover:text-luxury-gold'
                  }`}
                >
                  <Icon className={`h-6 w-6 mr-3 transition-all duration-300 ${isActive ? '' : 'group-hover:text-luxury-gold'}`} />
                  <span className="font-oswald text-lg">{link}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-luxury-gold/20 text-center text-xs text-luxury-dark-text/60">
        <p>&copy; 2024 Luxury Travels Ltd.</p>
      </div>
    </aside>
  );
};

export default Sidebar;