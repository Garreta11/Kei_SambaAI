import styles from './header.module.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.header}>
      <Image
        src='/samba_logo_white.png'
        width={38}
        height={36}
        alt='samba-logo'
      />
    </div>
  );
};

export default Header;
