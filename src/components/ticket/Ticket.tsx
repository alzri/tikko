import styles from './Ticket.module.scss';
import ConfLogo from '@/assets/images/logo-mark.svg';
import GitHuvIcon from '@/assets/images/icon-github.svg';
import Image from 'next/image';
import { TicketData } from '@/lib/fetchdata';

export const Ticket = ({ id, name, username, avatar }: TicketData) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.infoWrapper}>
        <div className={styles.confContainer}>
          <ConfLogo />
          <div className={styles.confInfo}>
            <h4>Coding Conf</h4>
            <p className={styles.ticketDateInfo}>Jan 31, 2026 / Austin, TX</p>
          </div>
        </div>
        <div className={styles.userInfoWrapper}>
          <Image src={avatar} alt={name} width={80} height={80} />
          <div className={styles.user}>
            <p className={styles.userName}>{name}</p>
            <div className={styles.usernameWrapper}>
              <GitHuvIcon />
              <p className={styles.githunName}>@{username}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ticketNumberWrapper}>
        <p className={styles.ticketNumber}>#{id}</p>
      </div>
    </div>
  );
};
