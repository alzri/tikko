'use client';
import { useState } from 'react';
import { InputField } from '../input-field/InputField';
import styles from './TicketForm.module.scss';
import { handleTicketData } from '@/src/utils/general';

export const TicketForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatarImage, setAvatarImage] = useState<File | undefined>();

  const onSubmit = (e: React.FormEvent) =>
    handleTicketData(e, { name, email, username, avatarImage });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit}>
        <InputField
          label="Upload Avatar"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAvatarImage(e.target.files?.[0])}
        />
        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <InputField
          label="GitHub Username"
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        <button className={styles.submitButton} type="submit">
          Generate Ticket
        </button>
      </form>
    </div>
  );
};
