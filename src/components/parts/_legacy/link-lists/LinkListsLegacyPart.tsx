import React from 'react';
import { ContentList } from 'components/_common/content-list/ContentList';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { translator } from 'translations';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { appOrigin } from 'utils/urls';

import style from './LinkLists.module.scss';

export const LinkListsLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.SectionPage) {
        return null;
    }

    const getLabel = translator('linkLists', props.language);
    const { data } = props;
    const { newsContents, moreNewsUrl, ntkContents, scContents } = data;

    const newsUrlAbsolute =
        moreNewsUrl && (moreNewsUrl.startsWith('/') ? `${appOrigin}${moreNewsUrl}` : moreNewsUrl);

    return (
        <>
            {(ntkContents || newsContents || scContents) && (
                <div className={style.linkLists}>
                    {ntkContents && (
                        <ContentList
                            content={ntkContents}
                            listType={'chevron'}
                            className={style.column}
                        />
                    )}
                    {newsContents?.data?.sectionContents &&
                        newsContents.data.sectionContents.length > 0 && (
                            <div className={style.column}>
                                <ContentList
                                    content={newsContents}
                                    showDateLabel={true}
                                    listType={'chevron'}
                                />
                                {newsUrlAbsolute && (
                                    <LenkeStandalone
                                        href={newsUrlAbsolute}
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
                            listType={'chevron'}
                            className={style.column}
                        />
                    )}
                </div>
            )}
        </>
    );
};
