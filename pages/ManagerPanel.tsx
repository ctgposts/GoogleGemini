import React from 'react';
import { User, Ticket, TicketStatus } from '../types';
import { TICKETS } from '../constants';
import Section from '../components/Section';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { BanknotesIcon, TicketIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ManagerPanelProps {
  user: User;
}

const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Available: return 'text-luxury-success';
      case TicketStatus.Sold: return 'text-luxury-gold';
      case TicketStatus.Booked: return 'text-luxury-info';
      default: return 'text-luxury-dark-text/80';
    }
  };

const ManagerPanel: React.FC<ManagerPanelProps> = ({ user }) => {
  const totalSales = TICKETS.filter(t => t.status === TicketStatus.Sold).reduce((sum, t) => sum + t.salePrice, 0);
  const ticketsSold = TICKETS.filter(t => t.status === TicketStatus.Sold).length;
  const ticketsAvailable = TICKETS.filter(t => t.status === TicketStatus.Available).length;

  return (
    <div className="animate-luxury-fade">
      <header className="mb-8">
        <h1 className="text-4xl font-oswald text-luxury-dark-text">Manager Panel</h1>
        <p className="text-luxury-dark-text/70">Welcome, {user.name}. Focus on driving sales and managing bookings.</p>
      </header>

      <Section title="Sales Performance" className="border-luxury-bronze/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<BanknotesIcon />} title="Total Sales" value={`৳${totalSales.toLocaleString()}`} colorClass="border-luxury-gold" animationClass="animate-luxury-fade" />
          <StatCard icon={<CheckCircleIcon />} title="Tickets Sold" value={ticketsSold.toString()} colorClass="border-luxury-bronze" animationClass="animate-luxury-fade [animation-delay:200ms]" />
          <StatCard icon={<TicketIcon />} title="Tickets Available" value={ticketsAvailable.toString()} colorClass="border-luxury-success" animationClass="animate-luxury-fade [animation-delay:400ms]" />
        </div>
      </Section>

       <Section 
        title="Tickets for Sale" 
        className="border-luxury-bronze/50"
        actions={
          <button className="bg-luxury-gold hover:bg-luxury-gold/80 text-luxury-dark-bg font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105">
            <PlusIcon className="h-5 w-5 mr-2" /> Sell Ticket
          </button>
        }
      >
        <DataTable<Ticket>
          headers={['ID', 'Type', 'Details', 'Sale Price', 'Status']}
          data={TICKETS.filter(t => [TicketStatus.Available, TicketStatus.Booked].includes(t.status))}
          renderRow={(ticket) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{ticket.id}</td>
              <td className="px-6 py-4">{ticket.type}</td>
              <td className="px-6 py-4 max-w-sm truncate">{ticket.details}</td>
              <td className="px-6 py-4 font-bold text-luxury-dark-text">৳{ticket.salePrice.toLocaleString()}</td>
              <td className={`px-6 py-4 font-bold ${getStatusColor(ticket.status)}`}>{ticket.status}</td>
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default ManagerPanel;