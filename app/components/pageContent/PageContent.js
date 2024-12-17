'use client';
import React, { useContext } from 'react';
import styles from './pageContent.module.scss';
import { DataContext } from '@/app/context';

const PageContent = ({ children }) => {
  const { loading } = useContext(DataContext);
  return (
    <div className={`${styles.content} ${loading ? styles.content__show : ''}`}>
      {children}
    </div>
  );
};

export default PageContent;
