import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { Heading } from '@navikt/ds-react';
import style from './FrontpageShortcutsCard.module.scss';

type FrontPageShortcutsCardProps = {
    href: string;
    text: string;
    analyticsLinkGroup: string;
    illustration?: AnimatedIconsProps;
};

export const FrontPageShortcutsCard = ({
    href,
    text,
    analyticsLinkGroup,
    illustration,
}: FrontPageShortcutsCardProps) => {
    return (
        <LenkeBase
            className={style.card}
            href={href}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            <Illustration
                className={style.illustration}
                illustration={illustration}
            />
            <Heading size="medium" level="3" className={style.text}>
                {text}
            </Heading>
        </LenkeBase>
    );
};
