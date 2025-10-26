'use client';

import { useState } from 'react';
import { TicketForm } from '../components/ticket-form/TicketForm';
import { Ticket } from '@/components/ticket/Ticket';
import { TicketData } from '@/lib/fetchdata';
import defaultAvatar from '../assets/images/image-avatar.jpg';
import LogoIcon from '@/assets/images/logo-full.svg';
import styles from './page.module.scss';

export default function Home() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  return (
    <main>
      <div className={styles.ticketFormWrapper}>
        <LogoIcon className={styles.logo} />
        {!ticketData ? (
          <div className={styles.formContainer}>
            <div className={styles.heading}>
              <h1>
                Your Journey to Coding Conf <br />
                2025 Starts Here
              </h1>
              <p>Secure your spot at next year&apos;s biggest coding conference.</p>
            </div>
            <TicketForm
              onTicketGenerated={(data) => {
                setTicketData({
                  id: Math.floor(Math.random() * 1000),
                  name: data.name,
                  email: data.email,
                  username: data.username,
                  avatar: data.avatarImage
                    ? URL.createObjectURL(data.avatarImage)
                    : defaultAvatar.src,
                });
              }}
            />
          </div>
        ) : (
          <div className={styles.tickerContaner}>
            <div className={styles.heading}>
              <h1>
                Congrats, <span className={styles.userName}>{ticketData.name}</span>!<br /> Your
                ticket is ready.
              </h1>
              <p>
                We&apos;ve emaild your ticket to <br />
                <span className={styles.userEmail}>{ticketData.email}</span> and will send updates
                in <br /> the run up to the event.
              </p>
            </div>
            <Ticket {...ticketData} />
          </div>
        )}
      </div>
    </main>
  );
}
