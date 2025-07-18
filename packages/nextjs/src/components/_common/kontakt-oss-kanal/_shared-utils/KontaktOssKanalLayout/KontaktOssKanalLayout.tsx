import React, { PropsWithChildren } from 'react';
import style from './KontaktOssKanalLayout.module.scss';

type Props = PropsWithChildren<{
    icon: React.ReactNode;
}>;

export const KontaktOssKanalLayout = ({ icon, children }: Props) => {
    return (
        <div className={style.kontaktOssKanal}>
            {icon}
            <div className={style.content}>{children}</div>
        </div>
    );
};
