import React from 'react';
import { User, UserRole } from '../types';
import { USERS } from '../constants';
import Section from '../components/Section';
import DataTable from '../components/DataTable';
import { PlusIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  if (user.role !== UserRole.Admin) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-luxury-fade">
        <ShieldCheckIcon className="h-24 w-24 text-luxury-danger mb-4" />
        <h1 className="text-4xl font-oswald text-luxury-danger">Access Denied</h1>
        <p className="text-luxury-dark-text/70 mt-2">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="animate-luxury-fade">
      <header className="mb-8">
        <h1 className="text-4xl font-oswald text-luxury-dark-text">System Settings</h1>
        <p className="text-luxury-dark-text/70">Manage users and system configurations.</p>
      </header>

      <Section 
        title="User Management"
        animationClass="animate-velvet-slide"
        actions={
          <button className="bg-luxury-gold hover:bg-luxury-gold/80 text-luxury-dark-bg font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105">
            <PlusIcon className="h-5 w-5 mr-2" /> Add User
          </button>
        }
      >
        <DataTable<User>
          headers={['ID', 'Name', 'Role', 'Actions']}
          data={USERS}
          renderRow={(u) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{u.id}</td>
              <td className="px-6 py-4">{u.name}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === UserRole.Admin ? 'bg-luxury-gold text-luxury-dark-bg' : 'bg-luxury-bronze text-white'}`}>
                  {u.role}
                </span>
              </td>
              <td className="px-6 py-4">
                 <button className="text-luxury-bronze hover:text-luxury-gold p-1">Edit</button>
                 <button className="text-luxury-danger hover:text-luxury-danger/80 p-1 ml-4">Delete</button>
              </td>
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default Settings;