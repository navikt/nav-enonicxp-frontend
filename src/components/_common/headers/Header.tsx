import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';

// eslint-disable-next-line css-modules/no-unused-class
import style from './Header.module.scss';

type Props = {
    children: React.ReactNode;
    level: Level;
    size?: Size;
    anchorId?: string;
    className?: string;
};

export const Header = ({ children, size, level, anchorId, className }: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;
    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div className={classNames(style.header, className)}>
            <div className={style.anchorOffset} id={anchorId} tabIndex={-1} />
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {(anchor && level === '2') || level === '3' ? (
                    <a href={anchor} className={style.anchorLink}>
                        {children}
                    </a>
                ) : (
                    children
                )}
            </Heading>
        </div>
    );
};
