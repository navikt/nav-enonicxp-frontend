import React from 'react';
import { BEM } from 'utils/classnames';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Innholdstittel } from 'nav-frontend-typografi';
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
            <Innholdstittel>{props.displayName}</Innholdstittel>
            <div className={bem('ingress')}>
                <Normaltekst>{props.data.ingress}</Normaltekst>
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
                            <Normaltekst>
                                <LenkeInline href={_path}>
                                    {displayName}
                                </LenkeInline>
                            </Normaltekst>
                            {ingress && (
                                <div className={bem('ingress')}>
                                    <Normaltekst>{ingress}</Normaltekst>
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
            <Undertekst>
                {`${getDateLabel('published')}: ${formatDate(createdTime)}`}
                {' | '}
                {`${getDateLabel('lastChanged')}: ${formatDate(modifiedTime)}`}
            </Undertekst>
        </div>
    );
};

export default PageList;
