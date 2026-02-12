import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';
import { classNames } from 'utils/classnames';
import { Language } from 'translations';

import style from './LargeCard.module.scss';

type Props = {
    tagline?: string;
    description?: string;
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
    className?: string;
    language?: Language;
    taglineLanguage?: Language;
};

export const LargeCard = (props: Props) => {
    const { link, description, type, tagline, illustration, className, language, taglineLanguage } =
        props;

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    return (
        <LinkCard
            className={classNames(style.LargeCard, className)}
            lang={language}
            {...userEventProps}
        >
            {illustration && (
                <LinkCard.Icon>
                    <IllustrationStatic
                        illustration={illustration}
                        className={style.illustration}
                    />
                </LinkCard.Icon>
            )}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase href={link.url} {...analyticsProps}>
                        {link.text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>{description}</LinkCard.Description>
            <LinkCard.Footer className={style.tagline} lang={taglineLanguage}>
                {tagline}
            </LinkCard.Footer>
        </LinkCard>
    );
};
