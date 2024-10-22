import React, { useState } from 'react';
import { TextField } from '@navikt/ds-react';
import { SiteInfoContentProps } from 'components/_editor-only/site-info/types';
import { SiteInfoSubHeader } from 'components/_editor-only/site-info/_common/sub-header/SiteInfoSubHeader';
import { Expandable } from 'components/_common/expandable/Expandable';
import { SiteInfoCustomPathItem } from './content-item/SiteInfoCustomPathItem';

import style from './SiteInfoCustomPaths.module.scss';

type Props = {
    contentList: SiteInfoContentProps<true>[];
};

export const SiteInfoCustomPaths = ({ contentList }: Props) => {
    const [filter, setFilter] = useState('');

    return (
        <div>
            <SiteInfoSubHeader text={"Kort-url'er"} />
            <Expandable title={`Sider med kort-url (${contentList.length})`}>
                <TextField
                    label={'Søk etter kort-url'}
                    size={'small'}
                    onChange={(e) => setFilter(e.currentTarget.value)}
                    className={style.filter}
                />
                {contentList
                    .filter((content) => content.customPath.includes(filter))
                    .map((content) => (
                        <SiteInfoCustomPathItem {...content} key={content.id} />
                    ))}
            </Expandable>
        </div>
    );
};
