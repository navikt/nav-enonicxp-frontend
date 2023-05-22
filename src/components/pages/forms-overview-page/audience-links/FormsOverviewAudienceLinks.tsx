import React from 'react';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { Ingress } from '@navikt/ds-react';

import style from './FormsOverviewAudienceLinks.module.scss';

type Props = {
    links: Array<{ url: string; text: string }>;
};

export const FormsOverviewAudienceLinks = ({ links }: Props) => {
    return (
        <ul className={style.list}>
            {links.map((link) => (
                <li key={link.url} className={style.item}>
                    <Ingress>
                        <LenkeInline href={link.url}>{link.text}</LenkeInline>
                    </Ingress>
                </li>
            ))}
        </ul>
    );
};
