
import { User, Ticket, UmrahPackage, VisaApplication, UserRole, TicketStatus, VisaStatus } from './types';

export const USERS: User[] = [
  { id: 1, name: 'Sultan Mirza', role: UserRole.Admin },
  { id: 2, name: 'Kamal Hasan', role: UserRole.Manager },
  { id: 3, name: 'Fatima Begum', role: UserRole.Staff },
];

export const TICKETS: Ticket[] = [
  { id: 'DXB-001', type: 'General - Package', details: 'Dhaka to Dubai (Flight + 5* Hotel)', purchasePrice: 75000, salePrice: 85000, status: TicketStatus.Available },
  { id: 'CXB-BUS-01', type: 'General - Non-Package', details: 'Dhaka to Cox\'s Bazar (AC Bus)', purchasePrice: 2000, salePrice: 2500, status: TicketStatus.Sold, customerName: 'Rahim Sheikh', saleDate: '2023-10-25' },
  { id: 'JED-001', type: 'Umrah - Package', details: '10 Days Umrah Premium Package', purchasePrice: 150000, salePrice: 175000, status: TicketStatus.Available },
  { id: 'MED-HTL-01', type: 'Umrah - Non-Package', details: '5 Nights - Movenpick Madinah', purchasePrice: 40000, salePrice: 45000, status: TicketStatus.Booked, customerName: 'Ayesha Siddika' },
  { id: 'KUL-005', type: 'General - Package', details: 'Dhaka to Kuala Lumpur (Flight + 3* Hotel)', purchasePrice: 45000, salePrice: 52000, status: TicketStatus.Available },
  { id: 'DAC-CXB-TRN', type: 'General - Non-Package', details: 'Dhaka to Cox\'s Bazar (Train)', purchasePrice: 1500, salePrice: 1800, status: TicketStatus.Cancelled },
];

export const UMRAH_PACKAGES: UmrahPackage[] = [
    { id: 'JED-001', type: 'Umrah - Package', details: '10 Days Umrah Premium Package', purchasePrice: 150000, salePrice: 175000, status: TicketStatus.Available, includes: ['Flight', '5* Hotel Makkah/Madinah', 'Private Transport', 'Guided Ziyarah'] },
    { id: 'JED-002', type: 'Umrah - Package', details: '14 Days Umrah Economy Package', purchasePrice: 110000, salePrice: 125000, status: TicketStatus.Available, includes: ['Flight', '3* Hotel Makkah/Madinah', 'Bus Transport', 'Guided Ziyarah'] },
    { id: 'JED-003', type: 'Umrah - Package', details: '7 Days Umrah Gold Package', purchasePrice: 200000, salePrice: 240000, status: TicketStatus.Sold, customerName: 'Anwar Hossain', saleDate: '2023-10-20', includes: ['Business Class Flight', '5* Clock Tower Hotel', 'Luxury SUV', 'Personal Guide'] },
];

export const VISA_APPLICATIONS: VisaApplication[] = [
    { id: 'V-UM-901', customerName: 'Ayesha Siddika', passportNumber: 'A01234567', status: VisaStatus.Processing, submissionDate: '2023-10-18', linkedTicketId: 'MED-HTL-01' },
    { id: 'V-UM-902', customerName: 'Anwar Hossain', passportNumber: 'B09876543', status: VisaStatus.Approved, submissionDate: '2023-10-15', linkedTicketId: 'JED-003' },
    { id: 'V-UM-903', customerName: 'Karimullah Khan', passportNumber: 'C05556677', status: VisaStatus.Pending, submissionDate: '2023-10-26' },
    { id: 'V-UM-904', customerName: 'Sumaiya Akter', passportNumber: 'D03322114', status: VisaStatus.Rejected, submissionDate: '2023-10-12' },
];
