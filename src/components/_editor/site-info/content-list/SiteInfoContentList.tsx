import React, { Fragment } from 'react';
import { SiteInfoContentSummary } from '../content-info/SiteInfoContentSummary';
import { Heading } from '@navikt/ds-react';
import { SiteInfoContentSummaryProps } from '../types';
import { Expandable } from '../../../_common/expandable/Expandable';

import style from './SiteInfoContentList.module.scss';

type Props = {
    title: string;
    titleEmpty: string;
    contentList: SiteInfoContentSummaryProps[];
};

export const SiteInfoContentList = ({
    title,
    titleEmpty,
    contentList,
}: Props) => {
    const { length } = contentList;

    return length > 0 ? (
        <Expandable title={`${title} (${length})`} className={style.wrapper}>
            {contentList.map((content, index) => {
                return (
                    <Fragment key={content.id}>
                        {index > 0 && <hr className={style.separator} />}
                        <SiteInfoContentSummary {...content} />
                    </Fragment>
                );
            })}
        </Expandable>
    ) : (
        <Heading size={'medium'} level={'3'} className={style.wrapper}>
            {titleEmpty}
        </Heading>
    );
};
