import { PropsWithChildren } from 'react';
import style from './MellomstegLayout.module.scss';

export const MellomstegLayout = (props: PropsWithChildren) => {
    return <div className={style.mellomstegLayout}>{props.children}</div>;
};
