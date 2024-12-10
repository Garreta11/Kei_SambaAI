import styles from './header.module.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.header}>
      <Image
        src='samba_logo_white.svg'
        width={37.41}
        height={36}
        alt='amba-logo'
      />
    </div>
  );
};

export default Header;
