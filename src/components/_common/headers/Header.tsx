import React from 'react';
import { Heading } from '@navikt/ds-react';
import { onlyText } from 'utils/react-children';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import { CopyLink } from 'components/_common/copyLink/copyLink';

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
            {anchor && !hideCopyButton && <CopyLink heading={onlyText(children)} anchor={anchor} />}
        </div>
    );
};
