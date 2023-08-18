import React from 'react';
import style from './toolbar.module.css';

export const BlockToolContainer = ({ children }: React.PropsWithChildren) => {
    return <div className={style.toolContainer}>{children}</div>;
};
