import React from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { Heading } from '@navikt/ds-react';
import { StaticImage } from 'components/_common/image/StaticImage';
import { FancyChevron } from 'components/_common/chevron/FancyChevron';
import soknaderOgSkjema from '/public/gfx/soknader_og_skjema_nav_ikon.svg';
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
    const pickIllustration = () => {
        // Midlertidig løsning, enn så lenge "Søknad og skjema" er en ekstern lenke
        if (text == 'Søknad og skjema') {
            return (
                <StaticImage
                    className={style.illustration}
                    imageData={soknaderOgSkjema}
                    alt=""
                />
            );
        }

        if (illustration) {
            return (
                <Illustration
                    className={style.illustration}
                    illustration={illustration}
                />
            );
        }

        return <FancyChevron color={'blue'} scale={2 / 3} />;
    };

    return (
        <LenkeBase
            className={style.card}
            href={href}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            {pickIllustration()}
            <Heading size="medium" level="3" className={style.text}>
                {text}
            </Heading>
        </LenkeBase>
    );
};
