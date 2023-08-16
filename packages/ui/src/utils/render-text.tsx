import React from 'react';
import styles from './render-text.module.css';

export const renderText = (text: string) => <div className={styles.text}>{text}</div>;
