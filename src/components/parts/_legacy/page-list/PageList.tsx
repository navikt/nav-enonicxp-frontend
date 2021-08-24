import React from 'react';
import { BEM } from 'utils/classnames';
import { Title, BodyLong, Ingress, BodyShort } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';
import { PageListProps } from 'types/content-props/page-list-props';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './PageList.less';

const PageList = (props: PageListProps) => {
    const bem = BEM('page-list');
    const { modifiedTime, createdTime, language } = props;
    const data = props.data;
    const hideDatesOnPage = data?.hide_date;
    const hideDatesInList = data?.hideSectionContentsDate;
    const orderListByPublishedDate = data?.orderSectionContentsByPublished;
    const sectionContents = (data?.sectionContents || [])
        .filter((section) => props._id !== section._id)
        .sort((a, b) =>
            orderListByPublishedDate
                ? new Date(b.createdTime).getTime() -
                  new Date(a.createdTime).getTime()
                : undefined
        );

    return (
        <div className={bem()}>
            <Title level={1} size="2xl">
                {props.displayName}
            </Title>
            <div className={bem('ingress')}>
                <Ingress>{props.data.ingress}</Ingress>
            </div>
            {!hideDatesOnPage && (
                <CreatedAndModifiedDate
                    language={language}
                    className={bem('date')}
                    createdTime={createdTime}
                    modifiedTime={modifiedTime}
                />
            )}
            <div className={bem('list')}>
                {sectionContents.map((section) => {
                    const { displayName, _path } = section;
                    const data = section.data;
                    const ingress = data?.ingress || data?.description;
                    const modifiedTime = section.modifiedTime;
                    const createdTime = section.createdTime;
                    return (
                        <div key={section._path} className={bem('row')}>
                            <BodyLong>
                                <LenkeInline href={_path}>
                                    {displayName}
                                </LenkeInline>
                            </BodyLong>
                            {ingress && (
                                <div className={bem('ingress')}>
                                    <BodyLong>{ingress}</BodyLong>
                                </div>
                            )}
                            {!hideDatesInList && (
                                <CreatedAndModifiedDate
                                    language={language}
                                    className={bem('date')}
                                    createdTime={createdTime}
                                    modifiedTime={modifiedTime}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface DatesProps {
    language: Language;
    className: string;
    createdTime: string;
    modifiedTime: string;
}

const CreatedAndModifiedDate = (props: DatesProps) => {
    const { createdTime, modifiedTime, language, className } = props;
    const getDateLabel = translator('dates', language);
    return (
        <div className={className}>
            <BodyShort size="s">
                {`${getDateLabel('published')}: ${formatDate(createdTime)}`}
                {' | '}
                {`${getDateLabel('lastChanged')}: ${formatDate(modifiedTime)}`}
            </BodyShort>
        </div>
    );
};

export default PageList;
