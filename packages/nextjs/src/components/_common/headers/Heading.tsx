import React, { PropsWithChildren } from 'react';
import { Heading as DsHeading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import style from './Header.module.scss';

type Props = PropsWithChildren<{
    level: Level;
    size?: Size;
    anchorId?: string;
    className?: string;
}>;

export const Heading = ({ children, size, level, anchorId, className }: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;
    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <DsHeading
            id={anchorId}
            size={size || fallbackSizeByLevel}
            level={level}
            className={classNames(style.header, className)}
        >
            {anchor && (level === '2' || level === '3') ? (
                <a href={anchor} className={style.anchorLink}>
                    {children}
                </a>
            ) : (
                children
            )}
        </DsHeading>
    );
};
