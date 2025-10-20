import styles from './page.module.scss';
import { TicketForm } from '../components/ticket-form/TicketForm';
import { Ticket } from '@/components/ticket/Ticket';
import { getTicketData } from '@/lib/fetchdata';

export default async function Home() {
  const ticket = await getTicketData();

  return (
    <>
      <main>
        <div className={styles.ticketForm}>
          <TicketForm />
          <Ticket
            id={ticket.id}
            name={ticket.name}
            email={ticket.email}
            username={ticket.username}
            avatar={ticket.avatar}
          />
        </div>
      </main>
    </>
  );
}
