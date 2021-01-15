import React from 'react';
import { ContentList } from '../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { Normaltekst } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { translator } from 'translations';
import { ContentProps } from '../../../types/content-props/_content-common';
import './LinkLists.less';

const LinkLists = (props: ContentProps) => {
    const getLabel = translator('linkLists', props.language);
    const { data } = props;

    const { newsContents, moreNewsUrl, ntkContents, scContents } = data;

    const bem = BEM('link-lists');

    return (
        <>
            {(ntkContents || newsContents || scContents) && (
                <div className={bem()}>
                    {ntkContents && (
                        <ContentList
                            content={ntkContents}
                            className={bem('column')}
                            aria-label={'Nyttig å vite'}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div
                            className={`${bem('column')} ${bem('nyheter')}`}
                            aria-label={'Nyheter'}
                        >
                            <ContentList
                                content={newsContents}
                                showDateLabel={true}
                            />
                            {moreNewsUrl && (
                                <LenkeStandalone
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    component={'link-list'}
                                    withChevron={false}
                                    analyticsLabel={'Flere nyheter'}
                                >
                                    <Normaltekst>
                                        {getLabel('moreNews')}
                                    </Normaltekst>
                                </LenkeStandalone>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            className={bem('column')}
                            aria-label={'Snarveier'}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
