export interface ITicketDataProps {
  ticket_id: number;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export interface ITicketFormProps {
  onTicketGenerated: (data: {
    ticket_id: number;
    name: string;
    email: string;
    username: string;
    avatarImage?: File;
  }) => void;
}
