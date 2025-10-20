'use client';

import { useState } from 'react';
import { TicketForm } from '../components/ticket-form/TicketForm';
import { Ticket } from '@/components/ticket/Ticket';
import { TicketData } from '@/lib/fetchdata';
import defaultAvatar from '../assets/images/image-avatar.jpg';
import styles from './page.module.scss';

export default function Home() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  return (
    <main>
      <div className={styles.ticketForm}>
        {!ticketData ? (
          <TicketForm
            onTicketGenerated={(data) => {
              setTicketData({
                id: Math.floor(Math.random() * 1000),
                name: data.name,
                email: data.email,
                username: data.username,
                avatar: data.avatarImage
                  ? URL.createObjectURL(data.avatarImage)
                  : defaultAvatar.src
              });
            }}
          />
        ) : (
          <Ticket {...ticketData} />
        )}
      </div>
    </main>
  );
}
