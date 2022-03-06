import React, { Fragment, useState } from 'react';
import { SiteInfoContentProps } from '../types';
import { SiteInfoSubHeader } from '../_common/sub-header/SiteInfoSubHeader';

import style from './SiteInfoCustomPaths.module.scss';
import { Expandable } from '../../../_common/expandable/Expandable';
import { SiteInfoCustomPathItem } from './content-item/SiteInfoCustomPathItem';
import { TextField } from '@navikt/ds-react';

type Props = {
    contentList: SiteInfoContentProps[];
};

export const SiteInfoCustomPaths = ({ contentList }: Props) => {
    const [filter, setFilter] = useState('');

    return (
        <div className={style.container}>
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
