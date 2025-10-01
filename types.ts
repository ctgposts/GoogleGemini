import React from 'react';

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  Staff = 'Staff',
}

export enum TicketStatus {
  Purchased = 'Purchased',
  Available = 'Available',
  Booked = 'Booked',
  Sold = 'Sold',
  Cancelled = 'Cancelled',
}

export enum VisaStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export interface Ticket {
  id: string;
  type: 'General - Package' | 'General - Non-Package' | 'Umrah - Package' | 'Umrah - Non-Package';
  details: string;
  purchasePrice: number;
  salePrice: number;
  status: TicketStatus;
  customerName?: string;
  saleDate?: string;
}

export interface UmrahPackage extends Ticket {
  includes: string[];
}

export interface VisaApplication {
  id: string;
  customerName: string;
  passportNumber: string;
  status: VisaStatus;
  submissionDate: string;
  linkedTicketId?: string;
}

export interface NavLink {
  name: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  component: string;
}
