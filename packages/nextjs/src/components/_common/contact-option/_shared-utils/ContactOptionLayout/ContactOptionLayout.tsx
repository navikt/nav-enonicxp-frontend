import React from 'react';
import style from './ContactOptionLayout.module.scss';

interface Props {
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const ContactOptionLayout = ({ icon, children }: Props) => {
    return (
        <div className={style.contactOption}>
            {icon}
            <div className={style.content}>{children}</div>
        </div>
    );
};
