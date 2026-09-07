import { ITicketApiResponseProps } from './types';

export const handleTicketData = async (
  e: React.FormEvent,
  {
    name,
    email,
    username,
  }: {
    name: string;
    email: string;
    username: string;
  }
) => {
  e.preventDefault();

  const ticket_id = Math.floor(10000 + Math.random() * 90000).toString();

  const formData = new FormData();
  formData.append('ticket_id', ticket_id);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('username', username);

  const res = await fetch('/api/submit', {
    method: 'POST',
    body: formData,
  });

  const data: ITicketApiResponseProps = await res.json();

  if (!res.ok || !data.success) {
    alert(`Error: ${data.error}`);
    return null;
  }

  return {
    ticket_id,
    name,
    email,
    username,
  };
};
