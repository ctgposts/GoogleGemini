import React from 'react';
import { User, UserRole, UmrahPackage, TicketStatus, VisaApplication, VisaStatus } from '../types';
import { UMRAH_PACKAGES, VISA_APPLICATIONS } from '../constants';
import Section from '../components/Section';
import DataTable from '../components/DataTable';
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

interface UmrahModuleProps {
  user: User;
}

const getTicketStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Available: return 'text-luxury-success';
      case TicketStatus.Sold: return 'text-luxury-gold';
      case TicketStatus.Booked: return 'text-luxury-info';
      default: return 'text-luxury-dark-text/80';
    }
};

const getVisaStatusColor = (status: VisaStatus) => {
    switch (status) {
        case VisaStatus.Pending: return 'text-luxury-gold-dark';
        case VisaStatus.Processing: return 'text-luxury-info';
        case VisaStatus.Approved: return 'text-luxury-success';
        case VisaStatus.Rejected: return 'text-luxury-danger';
    }
};

const UmrahModule: React.FC<UmrahModuleProps> = ({ user }) => {
  return (
    <div className="animate-luxury-fade">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-oswald text-luxury-gold animate-glow">Umrah Royal Services</h1>
        <p className="text-luxury-dark-text/70 mt-2">Dedicated portal for all Umrah-related operations.</p>
      </header>

      <Section 
        title="Umrah Packages" 
        animationClass="animate-velvet-slide"
        actions={
          user.role === UserRole.Admin && (
            <button className="bg-luxury-gold hover:bg-luxury-gold/80 text-luxury-dark-bg font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105">
              <PlusIcon className="h-5 w-5 mr-2" /> Add Package
            </button>
          )
        }
      >
        <DataTable<UmrahPackage>
          headers={['ID', 'Package Details', 'Includes', 'Sale Price', 'Status']}
          data={UMRAH_PACKAGES}
          renderRow={(pkg) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{pkg.id}</td>
              <td className="px-6 py-4 max-w-xs truncate">{pkg.details}</td>
              <td className="px-6 py-4 text-xs text-luxury-dark-text/70">{pkg.includes.join(', ')}</td>
              <td className="px-6 py-4 text-luxury-dark-text">৳{pkg.salePrice.toLocaleString()}</td>
              <td className={`px-6 py-4 font-bold ${getTicketStatusColor(pkg.status)}`}>{pkg.status}</td>
            </>
          )}
        />
      </Section>
      
      <Section 
        title="Visa Management" 
        animationClass="animate-velvet-slide [animation-delay:300ms]"
        actions={
          [UserRole.Admin, UserRole.Manager].includes(user.role) && (
             <button className="bg-luxury-bronze hover:bg-luxury-bronze/80 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105">
              <PlusIcon className="h-5 w-5 mr-2" /> New Application
            </button>
          )
        }
      >
        <DataTable<VisaApplication>
          headers={['ID', 'Customer Name', 'Passport No.', 'Linked Ticket', 'Status', 'Actions']}
          data={VISA_APPLICATIONS}
          renderRow={(visa) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{visa.id}</td>
              <td className="px-6 py-4">{visa.customerName}</td>
              <td className="px-6 py-4">{visa.passportNumber}</td>
              <td className="px-6 py-4">{visa.linkedTicketId || 'N/A'}</td>
              <td className={`px-6 py-4 font-bold ${getVisaStatusColor(visa.status)}`}>{visa.status}</td>
              <td className="px-6 py-4">
                <button className="text-luxury-bronze hover:text-luxury-gold p-1">
                  <EyeIcon className="h-5 w-5" />
                </button>
                 {user.role !== UserRole.Staff && (
                    <button className="text-luxury-bronze hover:text-luxury-gold p-1 ml-2">
                        Edit
                    </button>
                 )}
              </td>
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default UmrahModule;