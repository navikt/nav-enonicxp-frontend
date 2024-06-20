import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import { HeaderCommonConfig } from 'types/component-props/_mixins';

// eslint-disable-next-line css-modules/no-unused-class
import style from './Header.module.scss';

type Props = {
    children: React.ReactNode;
    level: Level;
    size?: Size;
    justify?: HeaderCommonConfig['justify'];
    anchorId?: string;
    className?: string;
};

export const Header = ({ children, size, level, justify, anchorId, className }: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;

    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div
            className={classNames(style.header, justify && style[`header__${justify}`], className)}
            id={anchorId ?? undefined}
            tabIndex={-1}
        >
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {children}
            </Heading>
            <a href={anchor} className={style.anchor} aria-hidden>
                <LinkIcon aria-hidden />
            </a>
        </div>
    );
};
