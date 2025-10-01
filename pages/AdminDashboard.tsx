import React from 'react';
import { User, Ticket, TicketStatus } from '../types';
import { TICKETS } from '../constants';
import Section from '../components/Section';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { ChartPieIcon, BanknotesIcon, ArrowTrendingUpIcon, TicketIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface AdminDashboardProps {
  user: User;
}

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.Available: return 'text-luxury-success';
    case TicketStatus.Sold: return 'text-luxury-gold';
    case TicketStatus.Booked: return 'text-luxury-info';
    case TicketStatus.Cancelled: return 'text-luxury-danger';
    default: return 'text-luxury-dark-text/80';
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const totalPurchase = TICKETS.reduce((sum, t) => sum + t.purchasePrice, 0);
  const totalSales = TICKETS.filter(t => t.status === TicketStatus.Sold).reduce((sum, t) => sum + t.salePrice, 0);
  const totalProfit = totalSales - TICKETS.filter(t => t.status === TicketStatus.Sold).reduce((sum, t) => sum + t.purchasePrice, 0);

  return (
    <div className="animate-luxury-fade">
      <header className="mb-8">
        <h1 className="text-4xl font-oswald text-luxury-dark-text">Admin Dashboard</h1>
        <p className="text-luxury-dark-text/70">Welcome, {user.name}. You have full system access.</p>
      </header>

      <Section title="System Overview" animationClass="animate-velvet-slide" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<BanknotesIcon />} title="Total Sales" value={`৳${totalSales.toLocaleString()}`} colorClass="border-luxury-gold" />
          <StatCard icon={<ShoppingCartIcon />} title="Total Purchase" value={`৳${totalPurchase.toLocaleString()}`} colorClass="border-luxury-bronze" />
          <StatCard icon={<ArrowTrendingUpIcon />} title="Estimated Profit" value={`৳${totalProfit.toLocaleString()}`} colorClass="border-luxury-success" />
          <StatCard icon={<TicketIcon />} title="Total Tickets" value={TICKETS.length.toString()} colorClass="border-luxury-info" />
        </div>
      </Section>

      <Section 
        title="Ticket Management" 
        actions={
          <>
            <button className="bg-luxury-bronze hover:bg-luxury-bronze/80 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105">
              <ShoppingCartIcon className="h-5 w-5 mr-2" /> Buy Ticket
            </button>
            <button className="bg-luxury-gold hover:bg-luxury-gold/80 text-luxury-dark-bg font-bold py-2 px-4 rounded-lg flex items-center transition-transform duration-200 hover:scale-105 animate-glow">
              <PlusIcon className="h-5 w-5 mr-2" /> Sell Ticket
            </button>
          </>
        }
      >
        <DataTable<Ticket>
          headers={['ID', 'Type', 'Details', 'Purchase Price', 'Sale Price', 'Status', 'Customer']}
          data={TICKETS}
          renderRow={(ticket) => (
            <>
              <td className="px-6 py-4 font-medium text-luxury-dark-text">{ticket.id}</td>
              <td className="px-6 py-4">{ticket.type}</td>
              <td className="px-6 py-4 max-w-xs truncate">{ticket.details}</td>
              <td className="px-6 py-4">৳{ticket.purchasePrice.toLocaleString()}</td>
              <td className="px-6 py-4">৳{ticket.salePrice.toLocaleString()}</td>
              <td className={`px-6 py-4 font-bold ${getStatusColor(ticket.status)}`}>{ticket.status}</td>
              <td className="px-6 py-4">{ticket.customerName || 'N/A'}</td>
            </>
          )}
        />
      </Section>
    </div>
  );
};

export default AdminDashboard;