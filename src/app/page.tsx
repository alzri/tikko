import styles from './page.module.scss';
import { TicketForm } from '../components/ticket-form/TicketForm';

export default async function Home() {
  return (
    <>
      <main>
        <div className={styles.ticketForm}>
          <TicketForm />
        </div>
      </main>
    </>
  );
}
