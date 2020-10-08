import React from 'react';
import { ContentList } from './content-list/ContentList';
import { LenkeNavNo } from '../_common/lenke-navno/LenkeNavNo';
import { Normaltekst } from 'nav-frontend-typografi';
import { SectionPageProps } from 'types/content-types/section-page-props';
import { BEM } from 'utils/bem';
import './LinkLists.less';

const LinkLists = (props: SectionPageProps) => {
    const {
        nrNews,
        newsContents,
        moreNewsUrl,
        nrNTK,
        ntkContents,
        nrSC,
        scContents,
    } = props.data;

    const bem = BEM('content-lists');

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
                                <LenkeNavNo
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    withChevron={false}
                                >
                                    <Normaltekst>{'Flere nyheter'}</Normaltekst>
                                </LenkeNavNo>
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
