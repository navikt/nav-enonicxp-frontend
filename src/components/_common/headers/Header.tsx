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
    addAnchorId?: boolean;
    className?: string;
};

export const Header = ({
    children,
    size,
    level,
    anchorId,
    className,
    addAnchorId = true, // Can be set to false if anchor is added outside of Header
}: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;
    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div
            className={classNames(style.header, className)}
            id={addAnchorId ? anchorId : undefined}
            tabIndex={-1}
        >
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {anchor && level === '2' ? (
                    <a href={anchor} className={style.anchor}>
                        {children}
                    </a>
                ) : (
                    children
                )}
            </Heading>
        </div>
    );
};
