import React from 'react';
import { ContentList } from '../../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import { translator } from 'translations';
import { ContentProps } from '../../../../types/content-props/_content-common';

import style from './LinkLists.module.scss';

const LinkLists = (props: ContentProps) => {
    const getLabel = translator('linkLists', props.language);
    const { data } = props;
    const { newsContents, moreNewsUrl, ntkContents, scContents } = data;

    return (
        <>
            {(ntkContents || newsContents || scContents) && (
                <div className={style.linkLists}>
                    {ntkContents && (
                        <ContentList
                            content={ntkContents}
                            withChevron={true}
                            className={style.column}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div className={style.column}>
                            <ContentList
                                content={newsContents}
                                showDateLabel={true}
                                withChevron={true}
                            />
                            {moreNewsUrl && (
                                <LenkeStandalone
                                    href={moreNewsUrl}
                                    className={style.moreNews}
                                    component={'link-list'}
                                    withChevron={false}
                                    analyticsLabel={'Flere nyheter'}
                                >
                                    {getLabel('moreNews')}
                                </LenkeStandalone>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            withChevron={true}
                            className={style.column}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
