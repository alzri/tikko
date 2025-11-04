export interface TicketData {
  ticket_id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export interface TicketFormProps {
  onTicketGenerated: (data: {
    ticket_id: string;
    name: string;
    email: string;
    username: string;
    avatarImage?: File;
  }) => void;
}

export interface ITicketApiResponseProps {
  success?: boolean;
  error?: string;
  data?: {
    id: string;
    ticket_id: string;
    name: string;
    email: string;
    username: string;
    image?: string;
    created_at?: string;
  };
}
