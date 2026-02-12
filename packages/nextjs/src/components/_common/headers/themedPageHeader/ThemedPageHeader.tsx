import React from 'react';
import { BodyShort, Detail } from '@navikt/ds-react';
import { Heading } from 'components/_common/headers/Heading';
import { classNames } from 'utils/classnames';
import { formatDate } from 'utils/datetime';
import { translator } from 'translations';
import { Illustration } from 'components/_common/illustration/Illustration';
import { getContentTagline } from 'components/_common/headers/sharedHeaderUtils';
import { ProductDataMixin } from 'types/component-props/_mixins';
import { ContentProps } from 'types/content-props/_content-common';
import { themedPageHeaderGetTypeClassName } from './themedPageHeaderUtils';

import style from './ThemedPageHeader.module.scss';

type Props = {
    contentProps: Pick<
        ContentProps,
        'type' | 'displayName' | 'modifiedTime' | 'data' | 'language'
    > & {
        data: Pick<
            ProductDataMixin,
            'title' | 'illustration' | 'taxonomy' | 'audience' | 'customCategory'
        >;
    };
    showTimeStamp?: boolean;
};

export const ThemedPageHeader = ({ contentProps, showTimeStamp = true }: Props) => {
    const { type, displayName, modifiedTime, language, data } = contentProps;
    const { title, illustration } = data;

    const getDatesLabel = translator('dates', language);

    const typeSpecificClassName = themedPageHeaderGetTypeClassName(type);
    const { tagline: subTitle } = getContentTagline(contentProps);

    const modified =
        showTimeStamp &&
        `${getDatesLabel('lastChanged')} ${formatDate({
            datetime: modifiedTime,
            language,
            short: true,
            year: true,
        })}`;

    return (
        <header className={classNames(style.themedPageHeader, typeSpecificClassName)}>
            <Illustration illustration={illustration} className={style.illustration} />
            <div className={style.text}>
                <Heading level={'1'} size={'xlarge'} className={style.header}>
                    {title || displayName}
                </Heading>
                {(subTitle || modified) && (
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
                )}
            </div>
        </header>
    );
};
