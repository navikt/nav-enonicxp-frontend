import React from 'react';
import { SiteInfoContentProps } from '../../types';
import { BodyShort, Heading } from '@navikt/ds-react';
import { SiteInfoEditorLink } from '../../_common/links/SiteInfoEditorLink';
import { SiteInfoLink } from '../../_common/links/SiteInfoLink';

import style from './SiteInfoCustomPathItem.module.scss';

export const SiteInfoCustomPathItem = ({
    customPath,
    path,
    displayName,
    id,
}: SiteInfoContentProps) => {
    return (
        <div className={style.container}>
            <div className={style.nameWrapper}>
                <Heading size={'small'} className={style.name}>
                    <SiteInfoLink href={customPath}>{customPath}</SiteInfoLink>
                </Heading>
                <SiteInfoEditorLink id={id} />
            </div>
            <BodyShort>{displayName}</BodyShort>
            <BodyShort size={'small'}>{`Intern url: ${path}`}</BodyShort>
        </div>
    );
};
