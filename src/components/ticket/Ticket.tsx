import styles from './Ticket.module.scss';
import ConfLogo from '@/assets/images/logo-mark.svg';
import GitHuvIcon from '@/assets/images/icon-github.svg';
import { TicketData } from '@/lib/fetchdata';

export const Ticket = ({ ticket_id, name, username }: TicketData) => {
  return (
    <div className={styles.ticket}>
      <div className={styles['info-wrapper']}>
        <div className={styles['conf-container']}>
          <ConfLogo />
          <div className={styles['conf-info']}>
            <h4>Coding Conf</h4>
            <p className={styles['ticket-date-info']}>Jan 31, 2026 / Austin, TX</p>
          </div>
        </div>
        <div className={styles['user-info-wrapper']}>
          <div className={styles.user}>
            <p className={styles['user-name']}>{name}</p>
            <div className={styles['username-wrapper']}>
              <GitHuvIcon />
              <p className={styles['githun-name']}>@{username}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['ticket-number-wrapper']}>
        <p className={styles['ticket-number']}>#{ticket_id}</p>
      </div>
    </div>
  );
};
