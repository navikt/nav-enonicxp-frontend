import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import ArtikkelDato from 'components/parts/_legacy/main-article/komponenter/ArtikkelDato';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

import style from './PageList.module.scss';

export const PageListLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.PageList) {
        return null;
    }

    const { data } = props;

    const hideDatesOnPage = data.hide_date;
    const hideDatesInList = data.hideSectionContentsDate;
    const orderListByPublishedDate = data.orderSectionContentsByPublished;

    const sectionContents = (data.sectionContents ?? [])
        .filter((section) => props._id !== section._id)
        .sort(
            orderListByPublishedDate
                ? (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
                : undefined
        );

    return (
        <div className={style.pageList}>
            <Heading level={'1'} size={'xlarge'}>
                {props.displayName}
            </Heading>
            <div className={style.ingress}>
                <BodyLong size={'large'}>{data.ingress}</BodyLong>
            </div>
            {!hideDatesOnPage && (
                <div className={style.date}>
                    <ArtikkelDato contentProps={props} />
                </div>
            )}
            <div className={style.list}>
                {sectionContents.map((section) => {
                    const { displayName, _path, data } = section;

                    const ingress = data ? data.ingress || data.description : undefined;

                    return (
                        <article key={_path} className={style.row}>
                            <BodyLong>
                                <LenkeInline href={_path}>{displayName}</LenkeInline>
                            </BodyLong>
                            {ingress && (
                                <div className={style.ingress}>
                                    <BodyLong>{ingress}</BodyLong>
                                </div>
                            )}
                            {!hideDatesInList && (
                                <div className={style.date}>
                                    <ArtikkelDato contentProps={section} />
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </div>
    );
};
