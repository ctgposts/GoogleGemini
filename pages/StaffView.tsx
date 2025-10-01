import React from 'react';
import { User, Ticket, TicketStatus, VisaApplication, VisaStatus } from '../types';
import { TICKETS, VISA_APPLICATIONS } from '../constants';
import Section from '../components/Section';
import DataTable from '../components/DataTable';
import { ClockIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

interface StaffViewProps {
  user: User;
}

const getTicketStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Booked: return 'text-luxury-info';
      default: return 'text-luxury-dark-text/80';
    }
};

const getVisaStatusColor = (status: VisaStatus) => {
    switch (status) {
        case VisaStatus.Pending: return 'text-luxury-gold-dark';
        case VisaStatus.Processing: return 'text-luxury-info';
        default: return 'text-luxury-dark-text/80';
    }
};

const StaffView: React.FC<StaffViewProps> = ({ user }) => {
  const pendingBookings = TICKETS.filter(t => t.status === TicketStatus.Booked);
  const pendingVisas = VISA_APPLICATIONS.filter(t => [VisaStatus.Pending, VisaStatus.Processing].includes(t.status));

  return (
    <div className="animate-luxury-fade">
      <header className="mb-8">
        <h1 className="text-4xl font-oswald text-luxury-dark-text">Staff Dashboard</h1>
        <p className="text-luxury-dark-text/70">Welcome, {user.name}. Here are your current tasks.</p>
      </header>

      <Section 
        title="Pending Bookings" 
        animationClass="animate-velvet-slide" 
        className="bg-white/50 border-luxury-bronze/30"
        actions={
            <div className="flex items-center text-luxury-bronze">
                <ClockIcon className="h-6 w-6 mr-2" />
                <span>{pendingBookings.length} bookings to process</span>
            </div>
        }
      >
        <DataTable<Ticket>
          headers={['ID', 'Details', 'Sale Price', 'Customer', 'Status']}
          data={pendingBookings}
          renderRow={(ticket) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{ticket.id}</td>
              <td className="px-6 py-4 max-w-sm truncate">{ticket.details}</td>
              <td className="px-6 py-4">৳{ticket.salePrice.toLocaleString()}</td>
              <td className="px-6 py-4">{ticket.customerName || 'N/A'}</td>
              <td className={`px-6 py-4 font-bold ${getTicketStatusColor(ticket.status)}`}>{ticket.status}</td>
            </>
          )}
        />
      </Section>
       <Section 
        title="Visa Application Updates" 
        animationClass="animate-velvet-slide [animation-delay:300ms]"
        className="bg-white/50 border-luxury-bronze/30"
        actions={
            <div className="flex items-center text-luxury-bronze">
                <DocumentCheckIcon className="h-6 w-6 mr-2" />
                <span>{pendingVisas.length} applications need attention</span>
            </div>
        }
      >
        <DataTable<VisaApplication>
          headers={['ID', 'Customer Name', 'Passport No.', 'Submission Date', 'Status']}
          data={pendingVisas}
          renderRow={(visa) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{visa.id}</td>
              <td className="px-6 py-4">{visa.customerName}</td>
              <td className="px-6 py-4">{visa.passportNumber}</td>
              <td className="px-6 py-4">{visa.submissionDate}</td>
              <td className={`px-6 py-4 font-bold ${getVisaStatusColor(visa.status)}`}>{visa.status}</td>
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default StaffView;