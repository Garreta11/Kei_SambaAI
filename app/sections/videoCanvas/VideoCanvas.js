'use client';
import { useRef, useEffect } from 'react';
import styles from './videoCanvas.module.scss';

const VideoCanvas = ({ videoSrc, pixelSize = 10 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!video || !ctx) {
      console.error('Video or Canvas context is missing');
      return;
    }

    const handleLoadedData = () => {
      console.log('** LOad data');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const drawPixelatedVideo = () => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Scale down to low resolution
        const scaledWidth = canvas.width / pixelSize;
        const scaledHeight = canvas.height / pixelSize;

        ctx.drawImage(video, 0, 0, scaledWidth, scaledHeight);

        // Scale back up to full size
        ctx.drawImage(
          canvas,
          0,
          0,
          scaledWidth,
          scaledHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );

        requestAnimationFrame(drawPixelatedVideo);
      };

      drawPixelatedVideo();
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [pixelSize]);

  return (
    <div className={`section ${styles.videoCanvas}`}>
      {/* Video element is hidden */}
      <video
        ref={videoRef}
        controls={true}
        autoPlay={true}
        muted
        loop
        style={{ display: 'none' }}
      >
        <source src={videoSrc} type='video/mp4' />
      </video>
      {/* Canvas for displaying the pixelated video */}
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'pixelated', // Ensures sharp pixelation
          width: '100%', // Optional: Adjust to your layout
          height: '100%',
        }}
      ></canvas>
    </div>
  );
};

export default VideoCanvas;
