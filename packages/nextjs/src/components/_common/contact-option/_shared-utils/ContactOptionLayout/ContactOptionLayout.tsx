import React, { PropsWithChildren } from 'react';
import style from './ContactOptionLayout.module.scss';

type Props = PropsWithChildren<{
    icon: React.ReactNode;
}>;

export const ContactOptionLayout = ({ icon, children }: Props) => {
    return (
        <div className={style.contactOption}>
            {icon}
            <div className={style.content}>{children}</div>
        </div>
    );
};
