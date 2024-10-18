import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { SiteInfoContentProps } from '@/editor-tools/pages/site-info/types';
import { SiteInfoLink } from '@/editor-tools/pages/site-info/_common/links/SiteInfoLink';

import style from './SiteInfoCustomPathItem.module.scss';

export const SiteInfoCustomPathItem = ({
    customPath,
    path,
    displayName,
    id,
}: SiteInfoContentProps<true>) => {
    return (
        <div className={style.container}>
            <div className={style.nameWrapper}>
                <Heading size={'small'} className={style.name}>
                    <SiteInfoLink target={'live'} path={customPath}>
                        {customPath}
                    </SiteInfoLink>
                </Heading>
                <BodyShort size={'small'}>
                    <SiteInfoLink target={'editor'} id={id} />
                </BodyShort>
            </div>
            <BodyShort size={'small'}>{displayName}</BodyShort>
            <BodyShort size={'small'}>{`Intern url: ${path}`}</BodyShort>
        </div>
    );
};
