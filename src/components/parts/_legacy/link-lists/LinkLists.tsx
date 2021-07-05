import React from 'react';
import { ContentList } from '../../../_common/content-list/ContentList';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import { BodyLong } from '@navikt/ds-react';
import { BEM, classNames } from 'utils/classnames';
import { translator } from 'translations';
import { ContentProps } from '../../../../types/content-props/_content-common';
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
                            withChevron={true}
                            className={bem('column')}
                        />
                    )}
                    {newsContents?.data?.sectionContents?.length > 0 && (
                        <div
                            className={classNames(
                                bem('column'),
                                bem('nyheter')
                            )}
                        >
                            <ContentList
                                content={newsContents}
                                showDateLabel={true}
                                withChevron={true}
                            />
                            {moreNewsUrl && (
                                <LenkeStandalone
                                    href={moreNewsUrl}
                                    className={bem('flere-nyheter')}
                                    component={'link-list'}
                                    withChevron={false}
                                    analyticsLabel={'Flere nyheter'}
                                >
                                    <BodyLong>{getLabel('moreNews')}</BodyLong>
                                </LenkeStandalone>
                            )}
                        </div>
                    )}
                    {scContents && (
                        <ContentList
                            content={scContents}
                            withChevron={true}
                            className={bem('column')}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default LinkLists;
