import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';

import style from './MiniCardV2.module.scss';

export type MiniKortProps = {
    link: LinkProps;
    // type: CardType;
    header?: string;
    className?: string;
    preferStaticIllustration?: boolean;
    withFallbackIllustration?: boolean;
};

export const MiniCardV2 = (props: MiniKortProps) => (
    <LenkeBase
        className={style.container}
        href={props.link.url}
        // {...analyticsProps} //TODO
    >
        <div className={style.text}>
            <BodyShort size="medium">HELSE OG SYKDOM</BodyShort>
            <BodyShort size="medium">{props.link.text}</BodyShort>
        </div>
        <ArrowRightIcon fontSize="1.5rem" />
    </LenkeBase>
);
