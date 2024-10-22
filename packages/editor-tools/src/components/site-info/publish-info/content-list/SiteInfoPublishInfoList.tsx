import React, { Fragment } from 'react';
import { Heading } from '@navikt/ds-react';
import { SiteInfoPublishInfoItem } from 'components/_editor-only/site-info/publish-info/content-item/SiteInfoPublishInfoItem';
import { SiteInfoContentProps } from 'components/_editor-only/site-info/types';
import { Expandable } from 'components/_common/expandable/Expandable';

import style from './SiteInfoPublishInfoList.module.scss';

type Props = {
    title: string;
    titleEmpty?: string;
    contentList: SiteInfoContentProps[];
};

export const SiteInfoPublishInfoList = ({ title, titleEmpty, contentList }: Props) => {
    const { length } = contentList;

    return length > 0 ? (
        <Expandable title={`${title} (${length})`} className={style.wrapper}>
            {contentList.map((content, index) => {
                return (
                    <Fragment key={content.id}>
                        {index > 0 && <hr className={style.separator} />}
                        <SiteInfoPublishInfoItem {...content} />
                    </Fragment>
                );
            })}
        </Expandable>
    ) : (
        titleEmpty && (
            <Heading size={'small'} level={'3'} className={style.wrapper}>
                {titleEmpty}
            </Heading>
        )
    );
};
