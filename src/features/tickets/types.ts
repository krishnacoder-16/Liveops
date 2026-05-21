export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
  id: string;
  customerName: string;
  issueType: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string; // ISO String
}

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'TKT-1001',
    customerName: 'Global Freight Inc.',
    issueType: 'Customs Clearance Delay',
    priority: 'high',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'TKT-1002',
    customerName: 'Oceanic Logistics',
    issueType: 'Missing Bill of Lading',
    priority: 'critical',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 'TKT-1003',
    customerName: 'FastTrack Shipping',
    issueType: 'Reefer Temp Alert',
    priority: 'medium',
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];
