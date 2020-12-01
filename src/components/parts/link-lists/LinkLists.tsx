import React from 'react';
import { ContentList } from '../../_common/content-list/ContentList';
import { LenkeNavNo } from '../../_common/lenke/LenkeNavNo';
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
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div className={`${bem('column')} ${bem('nyheter')}`}>
                            <ContentList
                                content={newsContents}
                                showDateLabel={true}
                            />
                            {moreNewsUrl && (
                                <LenkeNavNo
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    component={'link-list'}
                                    withChevron={false}
                                >
                                    <Normaltekst>
                                        {getLabel('moreNews')}
                                    </Normaltekst>
                                </LenkeNavNo>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            className={bem('column')}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
