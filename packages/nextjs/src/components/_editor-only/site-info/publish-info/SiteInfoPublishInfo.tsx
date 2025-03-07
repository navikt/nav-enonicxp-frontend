import React from 'react';
import { SiteInfoProps } from 'components/_editor-only/site-info/types';
import { SiteInfoSubHeader } from 'components/_editor-only/site-info/_common/sub-header/SiteInfoSubHeader';
import { SiteInfoPublishInfoList } from './content-list/SiteInfoPublishInfoList';

import style from './SiteInfoPublishInfo.module.scss';

type Props = Pick<
    SiteInfoProps,
    | 'recentlyPublished'
    | 'publishScheduled'
    | 'unpublishScheduledNextWeek'
    | 'unpublishScheduledLater'
>;

export const SiteInfoPublishInfo = ({
    publishScheduled,
    recentlyPublished,
    unpublishScheduledLater,
    unpublishScheduledNextWeek,
}: Props) => {
    const hasLaterUnpublishSchedule = unpublishScheduledLater.length > 0;

    return (
        <div className={style.container}>
            <SiteInfoSubHeader text={'Publiseringer'} />
            <SiteInfoPublishInfoList
                title={'Publisert siste 24 timer'}
                titleEmpty={'Ingen publiseringer siste 24 timer'}
                contentList={recentlyPublished}
            />
            <SiteInfoPublishInfoList
                title={'Planlagte forhåndspubliseringer'}
                titleEmpty={'Ingen planlagte forhåndspubliseringer'}
                contentList={publishScheduled}
            />
            <SiteInfoPublishInfoList
                title={`Planlagte avpubliseringer${
                    hasLaterUnpublishSchedule ? ' (neste 7 dager)' : ''
                }`}
                titleEmpty={`Ingen planlagte avpubliseringer${
                    hasLaterUnpublishSchedule ? ' neste 7 dager' : ''
                }`}
                contentList={unpublishScheduledNextWeek}
            />
            <SiteInfoPublishInfoList
                title={'Planlagte avpubliseringer (mer enn 7 dager frem i tid)'}
                contentList={unpublishScheduledLater}
            />
        </div>
    );
};
