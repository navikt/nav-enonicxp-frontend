import React, { useState } from 'react';
import { SiteInfoContentProps } from '../types';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';
import { Expandable } from '../../../_common/expandable/Expandable';
import { SiteInfoCustomPathItem } from './content-item/SiteInfoCustomPathItem';
import { TextField } from '@navikt/ds-react';

import style from './SiteInfoCustomPaths.module.scss';

type Props = {
    contentList: SiteInfoContentProps[];
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
                    .filter((content) => content.customPath?.includes(filter))
                    .map((content) => (
                        <SiteInfoCustomPathItem {...content} key={content.id} />
                    ))}
            </Expandable>
        </div>
    );
};
