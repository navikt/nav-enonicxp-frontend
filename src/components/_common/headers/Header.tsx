import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';

// eslint-disable-next-line css-modules/no-unused-class
import style from './Header.module.scss';

type Props = {
    children: React.ReactNode;
    level: Level;
    size?: Size;
    hideCopyButton?: boolean;
    anchorId?: string;
    className?: string;
};

export const Header = ({ children, size, level, hideCopyButton, anchorId, className }: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;

    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div className={classNames(style.header, className)} id={anchorId} tabIndex={-1}>
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {children}
            </Heading>
            <a href={anchor} className={style.anchor} aria-hidden>
                <LinkIcon aria-hidden />
            </a>
        </div>
    );
};
