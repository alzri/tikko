export interface TicketData {
  id: number;
  name: string;
  email: string;
  username: string;
  avatar: string;
}

export interface TicketFormProps {
  onTicketGenerated: (data: {
    name: string;
    email: string;
    username: string;
    avatarImage?: File;
  }) => void;
}
