export const handleTicketData = async (
  e: React.FormEvent,
  {
    name,
    email,
    username,
    avatarImage,
  }: { name: string; email: string; username: string; avatarImage?: File }
) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('username', username);
  if (avatarImage) formData.append('image', avatarImage);

  const res = await fetch('/api/submit', { method: 'POST', body: formData });
  const data = await res.json();

  if (res.ok) {
    alert('User added successfully!');
  } else {
    alert(`Error: ${data.error}`);
  }
};
