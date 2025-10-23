'use client';
import { useState } from 'react';
import { InputField } from '../input-field/InputField';
import styles from './TicketForm.module.scss';
import { handleTicketData } from '@/utils/general';
import InfoIcon from '@/assets/images/icon-info.svg';
import { TicketFormProps } from '@/utils/types';

export const TicketForm = ({ onTicketGenerated }: TicketFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [avatarImage, setAvatarImage] = useState<File | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
  
    setEmailError(null);
    await handleTicketData(e, { name, email, username, avatarImage });
    onTicketGenerated({ name, email, username, avatarImage });
  };
  

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit}>
        <InputField
          label="Upload Avatar"
          type="file"
          onChange={e => setAvatarImage(e.target.files?.[0])}
        />

        <InputField
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
          />
          {emailError && (
            <div className={styles.instructionsInfo}>
              <InfoIcon className={styles.infoIcon} />
              <p>Please enter a valid email address.</p>
            </div>
          )}
        </div>

        <InputField
          label="GitHub Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className={styles.submitButton} type="submit">
          Generate Ticket
        </button>
      </form>
    </div>
  );
};
