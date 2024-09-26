import React from 'react';
import { BodyShort, Detail } from '@navikt/ds-react';
import { Header } from 'components/_common/headers/Header';
import { classNames } from 'utils/classnames';
import { formatDate } from 'utils/datetime';
import { translator } from 'translations';
import { Illustration } from 'components/_common/illustration/Illustration';
import {
    PagePropsForPageHeader,
    getContentTagline,
} from 'components/_common/headers/sharedHeaderUtils';
import { usePageContentProps } from 'store/pageContext';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { themedPageHeaderGetTypeClassName } from './themedPageHeaderUtils';

import style from './ThemedPageHeader.module.scss';

type Props = {
    contentProps: Pick<ContentProps, 'type' | 'displayName' | 'modifiedTime' | 'data'> & {
        data: Pick<
            ProductDataMixin,
            // 'title' | 'illustration' | 'taxonomy' | 'audience' | 'customCategory'
            'title' | 'illustration'
        >;
    };
    showTimeStamp?: boolean;
};

export const ThemedPageHeader = ({ contentProps, showTimeStamp = true }: Props) => {
    const { type, displayName, modifiedTime, data } = contentProps;
    const { title, illustration } = data;
    const { language } = usePageContentProps();

    const getDatesLabel = translator('dates', language);

    const typeSpecificClassName = themedPageHeaderGetTypeClassName(type);
    // const subTitle = getContentTagline(contentProps);

    const modified =
        showTimeStamp &&
        `${getDatesLabel('lastChanged')} ${formatDate({
            datetime: modifiedTime,
            language,
            short: true,
            year: true,
        })}`;

    return (
        <div className={classNames(style.themedPageHeader, typeSpecificClassName)}>
            <Illustration illustration={illustration} className={style.illustration} />
            <div className={style.text}>
                <Header level={'1'} size={'xlarge'} className={style.header}>
                    {title || displayName}
                </Header>
                {/* {(subTitle || modified) && (
                    <div className={style.taglineWrapper}>
                        {subTitle && (
                            <BodyShort size="small" className={style.taglineLabel}>
                                {subTitle.toUpperCase()}
                            </BodyShort>
                        )}
                        {subTitle && modified && (
                            <span aria-hidden="true" className={style.divider}>
                                {'|'}
                            </span>
                        )}
                        {modified && <Detail>{modified}</Detail>}
                    </div>
                )} */}
            </div>
        </div>
    );
};
