import React from 'react';
import { ContentList } from './content-list/ContentList';
import { LenkeNavNo } from '../_common/lenke/LenkeNavNo';
import { Normaltekst } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { GlobalPageSchema, PageData } from 'types/content-types/_schema';
import { ContentType } from 'types/content-types/_schema';
import { LinkListTemplateMock } from './LinkListTemplateMock';
import { translator } from 'translations'
import './LinkLists.less';

const LinkLists = (props: GlobalPageSchema) => {
    const type = props.__typename;
    const getLabel = translator('linkLists', props.language);
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
                            component={'link-list'}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div className={`${bem('column')} ${bem('nyheter')}`}>
                            <ContentList
                                content={newsContents}
                                component={'link-list'}
                                maxItems={nrNews}
                                showDateLabel={true}
                                sorted={true}
                        />
                            {moreNewsUrl && (
                                <LenkeNavNo
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    component={'link-list'}
                                    withChevron={false}
                                >
                                    <Normaltekst>{getLabel('moreNews')}</Normaltekst>
                                </LenkeNavNo>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            className={bem('column')}
                            component={'link-list'}
                            maxItems={nrSC}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
