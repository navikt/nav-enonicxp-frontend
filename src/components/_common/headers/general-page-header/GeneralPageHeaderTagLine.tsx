import { BodyShort } from '@navikt/ds-react';

import style from './GeneralPageHeader.module.scss';

type Props = {
    tagLine: string;
};

export const GeneralPageHeaderTagLine = (props: Props) => {
    return (
        <BodyShort className={style.tagline} size="small">
            {props.tagLine}
        </BodyShort>
    );
};
