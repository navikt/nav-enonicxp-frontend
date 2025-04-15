import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import style from './FormsOverviewAudienceLinks.module.scss';

type Props = {
    links: Array<{ url: string; text: string }>;
};

export const FormsOverviewAudienceLinks = ({ links }: Props) => {
    return (
        <ul className={style.list}>
            {links.map((link) => (
                <BodyLong size={'large'} as={'li'} key={link.url} className={style.item}>
                    <LenkeInline href={link.url}>{link.text}</LenkeInline>
                </BodyLong>
            ))}
        </ul>
    );
};
