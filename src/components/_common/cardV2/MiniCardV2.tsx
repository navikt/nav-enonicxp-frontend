import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';

import style from './MiniCardV2.module.scss';

export const MiniCardV2 = () => (
    <LenkeBase
        href="https://www.nav.no/sykepenger"
        // href={link.url}
        // {...analyticsProps}
    >
        <div className={style.container}>
            <div className={style.text}>
                <BodyShort size="medium">HELSE OG SYKDOM</BodyShort>
                Har blitt sykmeldt
            </div>
            <ArrowRightIcon fontSize="1.5rem" />
        </div>
    </LenkeBase>
);
