import React, { useState, useMemo } from 'react';
import { UserRole, User } from './types';
import { USERS } from './constants';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import ManagerPanel from './pages/ManagerPanel';
import StaffView from './pages/StaffView';
import UmrahModule from './pages/UmrahModule';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { Bars3Icon, MoonIcon } from '@heroicons/react/24/outline';

const componentMap: { [key: string]: React.ComponentType<{ user: User }> } = {
  Dashboard: (props) => {
    switch (props.user.role) {
      case UserRole.Admin:
        return <AdminDashboard {...props} />;
      case UserRole.Manager:
        return <ManagerPanel {...props} />;
      case UserRole.Staff:
        return <StaffView {...props} />;
      default:
        return <div>Invalid Role</div>;
    }
  },
  'Umrah Module': UmrahModule,
  Reports: Reports,
  Settings: Settings,
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);
  const [activeComponent, setActiveComponent] = useState<string>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = USERS.find(u => u.role === e.target.value);
    if (selectedUser) {
      setCurrentUser(selectedUser);
      setActiveComponent('Dashboard'); // Reset to dashboard on role change
    }
  };

  const ActiveComponent = useMemo(() => componentMap[activeComponent] || componentMap['Dashboard'], [activeComponent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-cream to-luxury-light-gold text-luxury-dark-text font-montserrat flex">
      <Sidebar user={currentUser} activeComponent={activeComponent} setActiveComponent={setActiveComponent} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 md:ml-64 w-full md:w-auto transition-all duration-300">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center mb-6">
            <button onClick={() => setIsSidebarOpen(true)} className="text-luxury-dark-text p-2 -ml-2">
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-8 w-8" />
            </button>
            <div className="flex items-center">
                <MoonIcon className="h-6 w-6 text-luxury-gold" />
                <h1 className="text-xl font-oswald text-luxury-gold ml-2">UMRAH-SYS</h1>
            </div>
        </header>

        {/* Role Switcher for Demo */}
        <div className="absolute top-4 right-4 sm:right-8 bg-luxury-gold text-luxury-dark-bg p-2 rounded-lg shadow-lg z-30">
          <label htmlFor="role-switcher" className="mr-2 font-bold font-oswald text-xs sm:text-sm">Role:</label>
          <select
            id="role-switcher"
            value={currentUser.role}
            onChange={handleRoleChange}
            className="bg-luxury-pearl text-luxury-dark-bg rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-luxury-bronze text-xs sm:text-sm"
          >
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <ActiveComponent user={currentUser} />
      </main>
    </div>
  );
};

export default App;