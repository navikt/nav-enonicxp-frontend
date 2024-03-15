import React from 'react';
import { classNames } from 'utils/classnames';
import { PageHeader } from '../page-header/PageHeader';
import { formatDate } from 'utils/datetime';
import { BodyShort, Detail } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageContext } from 'store/pageContext';
import { Illustration } from 'components/_common/illustration/Illustration';
import {
    ContentPropsForThemedPageHeader,
    themedPageHeaderGetSubtitle,
    themedPageHeaderGetTypeClassName,
} from './themedPageHeaderUtils';

import style from './ThemedPageHeader.module.scss';

type Props = {
    contentProps: ContentPropsForThemedPageHeader;
    showTimeStamp?: boolean;
};

export const ThemedPageHeader = ({
    contentProps,
    showTimeStamp = true,
}: Props) => {
    const { type, displayName, modifiedTime, language, data } = contentProps;
    const { title, illustration } = data;

    const getDatesLabel = translator('dates', language);

    const typeSpecificClassName = themedPageHeaderGetTypeClassName(type);
    const subTitle = themedPageHeaderGetSubtitle(contentProps);

    const modified =
        showTimeStamp &&
        `${getDatesLabel('lastChanged')} ${formatDate({
            datetime: modifiedTime,
            language,
            short: true,
            year: true,
        })}`;

    return (
        <div
            className={classNames(
                style.themedPageHeader,
                typeSpecificClassName
            )}
        >
            <Illustration
                illustration={illustration}
                className={style.illustration}
            />
            <div className={style.text}>
                <PageHeader justify={'left'}>{title || displayName}</PageHeader>
                {(subTitle || modified) && (
                    <div className={style.taglineWrapper}>
                        {subTitle && (
                            <BodyShort
                                size="small"
                                className={style.taglineLabel}
                            >
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
        </div>
    );
};
