import React from 'react';
import { ContentList } from './content-list/ContentList';
import { Normaltekst } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { GlobalPageSchema, PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { LinkListTemplateMock } from './LinkListTemplateMock';
import { LenkeInline } from '../_common/lenke/LenkeInline';
import './LinkLists.less';

const LinkLists = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const data =
        type === ContentType.TemplatePage
            ? (LinkListTemplateMock as PageData)
            : props.data;

    const {
        nrNews,
        newsContents,
        moreNewsUrl,
        nrNTK,
        ntkContents,
        nrSC,
        scContents,
    } = data;

    const bem = BEM('link-lists');

    return (
        <>
            {(ntkContents || newsContents || scContents) && (
                <div className={bem()}>
                    {ntkContents && (
                        <ContentList
                            content={ntkContents}
                            className={bem('column')}
                            maxItems={nrNTK}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div className={`${bem('column')} ${bem('nyheter')}`}>
                            <ContentList
                                content={newsContents}
                                maxItems={nrNews}
                                showDateLabel={true}
                                sorted={true}
                            />
                            {moreNewsUrl && (
                                <LenkeInline
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                >
                                    <Normaltekst>{'Flere nyheter'}</Normaltekst>
                                </LenkeInline>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            className={bem('column')}
                            maxItems={nrSC}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
