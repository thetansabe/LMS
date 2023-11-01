export interface Ticket {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Column {
  id: string;
  title: string;
  tickets: Ticket[];
}
