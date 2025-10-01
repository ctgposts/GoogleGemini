
import React from 'react';
import { User, UserRole, Ticket, TicketStatus } from '../types';
import Section from '../components/Section';
import { TICKETS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  user: User;
}

const salesData = TICKETS.reduce((acc, ticket) => {
    const type = ticket.type.split(' - ')[0]; // 'General' or 'Umrah'
    if (!acc[type]) {
      acc[type] = { name: type, Sales: 0, Profit: 0 };
    }
    if (ticket.status === 'Sold') {
        acc[type].Sales += ticket.salePrice;
        acc[type].Profit += (ticket.salePrice - ticket.purchasePrice);
    }
    return acc;
}, {} as { [key: string]: { name: string; Sales: number; Profit: number }});

const chartData = Object.values(salesData);


const Reports: React.FC<ReportsProps> = ({ user }) => {
  return (
    <div className="animate-luxury-fade">
      <header className="mb-8">
        <h1 className="text-4xl font-oswald text-luxury-dark-text">Reports & Analytics</h1>
        <p className="text-luxury-dark-text/70">
          {user.role === UserRole.Admin ? 'Full analytical overview of the system.' : 'Your sales performance report.'}
        </p>
      </header>

      <Section title="Sales & Profit Analysis" animationClass="animate-velvet-slide">
        <div style={{ width: '100%', height: 400 }}>
             <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.2)" />
                    <XAxis dataKey="name" stroke="#4B3F21" />
                    <YAxis stroke="#4B3F21" tickFormatter={(value) => `৳${Number(value)/1000}k`} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(255, 253, 208, 0.9)', 
                            border: '1px solid #D4AF37', 
                            color: '#4B3F21' 
                        }} 
                        cursor={{fill: 'rgba(212, 175, 55, 0.1)'}}
                    />
                    <Legend wrapperStyle={{ color: '#4B3F21' }} />
                    <Bar dataKey="Sales" fill="#D4AF37" />
                    {user.role === UserRole.Admin && <Bar dataKey="Profit" fill="#CD7F32" />}
                </BarChart>
            </ResponsiveContainer>
        </div>
      </Section>

      {user.role === UserRole.Admin && (
        <Section title="Agent-wise Records" animationClass="animate-velvet-slide [animation-delay:300ms]">
          <p className="text-center text-luxury-dark-text/50">Agent-wise reporting data would be displayed here.</p>
        </Section>
      )}

    </div>
  );
};

export default Reports;