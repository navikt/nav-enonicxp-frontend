import React from 'react';
import { BEM } from 'utils/bem';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Innholdstittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { xpPathToAppPath } from 'utils/paths';
import { formatDate } from 'utils/datetime';
import { Language, translator } from 'translations';
import { PageListProps } from 'types/content-props/page-list-props';
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
            {!hideDatesOnPage === true && (
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
                                <Lenke href={xpPathToAppPath(_path)}>
                                    {displayName}
                                </Lenke>
                            </Normaltekst>
                            {ingress && (
                                <div className={bem('ingress')}>
                                    <Normaltekst>{ingress}</Normaltekst>
                                </div>
                            )}
                            {!hideDatesInList === true && (
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
