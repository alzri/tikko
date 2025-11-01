export const handleITicketDataProps = async (
  e: React.FormEvent,
  {
    name,
    email,
    username,
    avatarImage,
    ticket_id,
  }: { name: string; email: string; username: string; avatarImage?: File; ticket_id: string }
) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('ticket_id', ticket_id);
  if (avatarImage) formData.append('image', avatarImage);

  const res = await fetch('/api/submit', { method: 'POST', body: formData });
  const data: { success?: boolean; error?: string } = await res.json();

  if (!res.ok) {
    alert(`Error: ${data.error}`);
  }
};
