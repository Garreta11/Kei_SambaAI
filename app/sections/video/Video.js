import styles from './video.module.scss';

const Video = () => {
  return (
    <div className={styles.video}>
      <video
        width='100%'
        height='100%'
        autoPlay
        muted
        loop // Optional: makes the video play in a loop
        preload='auto'
      >
        <source src='/video-template.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
