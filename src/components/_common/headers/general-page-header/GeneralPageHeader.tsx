import { BodyShort, Heading } from '@navikt/ds-react';

import style from './GeneralPageHeader.module.scss';

export const GeneralPageHeader = () => {
    return (
        <div className={style.generalPageHeader}>
            <BodyShort className={style.tagLine}>Tagline</BodyShort>
            <Heading level="1" size="xlarge" className={style.header}>
                General Page Header
            </Heading>
        </div>
    );
};
