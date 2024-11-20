import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import { ComponentType } from 'types/component-props/_component-common';

// eslint-disable-next-line css-modules/no-unused-class
import style from './Header.module.scss';

type Props = {
    children: React.ReactNode;
    level: Level;
    size?: Size;
    anchorId?: string;
    className?: string;
    dataPortalComponent?: string;
    dataPortalComponentType?: ComponentType;
};

export const Header = ({
    children,
    size,
    level,
    anchorId,
    className,
    dataPortalComponent,
    dataPortalComponentType,
}: Props) => {
    const anchor = anchorId ? (anchorId.startsWith('#') ? anchorId : `#${anchorId}`) : undefined;
    const fallbackSizeByLevel = levelToSize[level] || 'large';

    console.log('Header', dataPortalComponent);

    return (
        <div
            className={classNames(style.header, className)}
            data-portal-component={dataPortalComponent}
            data-portal-component-type={dataPortalComponentType}
        >
            <div className={style.anchorOffset} id={anchorId} tabIndex={-1} />
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {anchor && (level === '2' || level === '3') ? (
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
