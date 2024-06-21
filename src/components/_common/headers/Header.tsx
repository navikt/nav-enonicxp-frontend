import React from 'react';
import { Heading } from '@navikt/ds-react';
import { LinkIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { Level, levelToSize, Size } from 'types/typo-style';
import { useClient } from 'utils/useClient';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

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
    const { hasMouse } = useClient();

    const copyLinkToClipboard = (e: React.MouseEvent) => {
        if (navigator?.clipboard?.writeText) {
            const baseUrl = (e.target as HTMLAnchorElement)?.baseURI?.split('#')[0];
            if (baseUrl) {
                navigator?.clipboard?.writeText(`${baseUrl}${anchor}`);
            }

            logAmplitudeEvent(AnalyticsEvents.COPY_LINK, {
                seksjon: children?.toString(),
            });
        }
    };

    const fallbackSizeByLevel = levelToSize[level] || 'large';

    return (
        <div
            className={classNames(style.header, hasMouse && style.anchorButtonEnabled, className)}
            id={anchorId}
            tabIndex={-1}
        >
            <Heading size={size || fallbackSizeByLevel} level={level}>
                {children}
                {anchor && (
                    <div className={style.anchorWrapper}>
                        <a
                            href={anchor}
                            onClick={copyLinkToClipboard}
                            className={style.anchorButton}
                            aria-hidden
                        >
                            <LinkIcon aria-hidden />
                        </a>
                    </div>
                )}
            </Heading>
        </div>
    );
};
