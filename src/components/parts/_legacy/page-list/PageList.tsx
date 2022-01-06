import React from 'react';
import { BEM } from 'utils/classnames';
import { Heading, BodyLong, Ingress } from '@navikt/ds-react';
import ArtikkelDato from '../main-article/ArtikkelDato'
import { translator } from 'translations';
import { PageListProps } from 'types/content-props/page-list-props';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import './PageList.less';

const PageList = (props: PageListProps) => {
    const bem = BEM('page-list');
    const { publish, modifiedTime, createdTime, language, data } = props;
    const getDateLabel = translator('mainArticle', language);
    const publishLabel = getDateLabel('published');
    const modifiedLabel = getDateLabel('lastChanged');
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
            <header>
                <Heading level="1" size="2xlarge">
                    {props.displayName}
                </Heading>
                <div className={bem('ingress')}>
                    <Ingress>{data.ingress}</Ingress>
                </div>
                {!hideDatesOnPage && (
                    <div className={'page-list__date'}>
                        <ArtikkelDato
                            publish={publish}
                            createdTime={createdTime}
                            modifiedTime={modifiedTime}
                            publishLabel={publishLabel}
                            modifiedLabel={modifiedLabel}
                        />
                    </div>
                )}
            </header>
            <div className={bem('list')}>
                {sectionContents.map((section) => {
                    const { displayName, _path, publish, modifiedTime, createdTime, data } = section;
                    const ingress = data?.ingress || data?.description;
                    return (
                        <article key={_path} className={bem('row')}>
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
                                <div className={'page-list__date'}>
                                    <ArtikkelDato
                                        publish={publish}
                                        createdTime={createdTime}
                                        modifiedTime={modifiedTime}
                                        publishLabel={publishLabel}
                                        modifiedLabel={modifiedLabel}
                                    />
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default PageList;
