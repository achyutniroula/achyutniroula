import NorleaseSkyline from './NorleaseSkyline';
import { norlease } from '../lib/norlease';
import styles from './NorleaseCard.module.css';

export default function NorleaseCard() {
  return (
    <div className={styles.card}>
      <div className={styles.animFrame}>
        <NorleaseSkyline />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/norlease-watermark.png"
          alt=""
          aria-hidden="true"
          width={720}
          height={414}
          className={styles.watermark}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.pill}>{norlease.status}</span>
        <h3 className={styles.title}>{norlease.name}</h3>
        <p className={styles.tagline}>{norlease.tagline}</p>
        <p className={styles.description}>{norlease.description}</p>
        <ul className={styles.list}>
          {norlease.differentiators.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className={styles.stack}>{norlease.stack}</p>
        <a href={norlease.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Visit northlease.ca ↗
        </a>
      </div>
    </div>
  );
}
