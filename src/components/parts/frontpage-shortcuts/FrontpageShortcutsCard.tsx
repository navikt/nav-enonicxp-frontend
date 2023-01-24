import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { LinkProps } from 'types/link-props';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { Heading } from '@navikt/ds-react';
import style from './FrontpageShortcutsCard.module.scss';

export type FrontPageShortcutsCardProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    analyticsLinkGroup: string;
};

export const FrontPageShortcutsCard = (props: FrontPageShortcutsCardProps) => {
    const { link, illustration, analyticsLinkGroup } = props;

    return (
        <LenkeBase
            className={style.card}
            href={link.url}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            <Illustration
                className={style.illustration}
                illustration={illustration}
            />
            <Heading size="medium" level="3" className={style.text}>
                {link.text}
            </Heading>
        </LenkeBase>
    );
};
