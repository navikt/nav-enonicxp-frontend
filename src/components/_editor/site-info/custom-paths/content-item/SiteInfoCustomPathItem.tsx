import React from 'react';
import { SiteInfoContentProps } from '../../types';
import { BodyShort, Heading } from '@navikt/ds-react';
import { SiteInfoEditorLink } from '../../_common/editor-link/SiteInfoEditorLink';

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
                    {customPath}
                </Heading>
                <SiteInfoEditorLink id={id} />
            </div>
            <BodyShort>{displayName}</BodyShort>
            <BodyShort size={'small'}>{`Intern url: ${path}`}</BodyShort>
        </div>
    );
};
