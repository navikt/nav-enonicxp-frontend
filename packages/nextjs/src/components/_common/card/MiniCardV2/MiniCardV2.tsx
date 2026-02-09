import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';
import { CardSize, CardType } from 'types/card';
import { classNames } from 'utils/classnames';
import { Language } from 'translations';

import style from './MiniCardV2.module.scss';

export type MiniCardProps = {
    link: LinkProps;
    type: CardType;
    tagline?: string;
    taglineLanguage?: Language;
    className?: string;
    language?: Language;
};

export const MiniCardV2 = ({
    link,
    type,
    tagline,
    taglineLanguage,
    className,
    language,
}: MiniCardProps) => {
    const { analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <LinkCard
            arrowPosition="center"
            className={classNames(style.miniCardV2, className)}
            lang={language}
        >
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase href={link.url} {...analyticsProps}>
                        {link.text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {tagline && (
                <LinkCard.Footer className={style.tagline}>
                    <span lang={taglineLanguage}>{tagline}</span>
                </LinkCard.Footer>
            )}
        </LinkCard>
    );
};
