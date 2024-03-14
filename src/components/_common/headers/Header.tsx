import React from 'react';
import { Heading } from '@navikt/ds-react';
import { onlyText } from 'utils/react-children';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import { HeaderCommonConfig } from 'types/component-props/_mixins';
import { CopyLink } from '../copyLink/copyLink';

// eslint-disable-next-line css-modules/no-unused-class
import style from './Header.module.scss';

type Props = {
    children: React.ReactNode;
    level: Level;
    size?: Size;
    justify?: HeaderCommonConfig['justify'];
    hideCopyButton?: boolean;
    anchorId?: string;
    setId?: boolean;
    className?: string;
};

export const Header = ({
    children,
    size,
    level,
    justify,
    hideCopyButton,
    anchorId,
    setId = true,
    className,
}: Props) => {
    const anchor = anchorId
        ? anchorId.startsWith('#')
            ? anchorId
            : `#${anchorId}`
        : undefined;

    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div
            className={classNames(
                style.header,
                justify && style[`header__${justify}`],
                className
            )}
            id={setId ? anchorId : undefined}
            tabIndex={-1}
        >
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {children}
            </Heading>
            {anchor && !hideCopyButton && (
                <CopyLink heading={onlyText(children)} anchor={anchor} />
            )}
        </div>
    );
};
