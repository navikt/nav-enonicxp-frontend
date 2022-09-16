import React from 'react';
import { classNames } from '../../utils/classnames';
import {
    ContentProps,
    ContentType,
} from '../../types/content-props/_content-common';
import { getContentLanguages } from '../../utils/languages';
import { VersionHistory } from './version-history/VersionHistory';
import { PageWarning } from './page-warning/PageWarning';

import style from './TopContainer.module.scss';

export const contentTypesWithWhiteHeader = {
    [ContentType.ProductPage]: true,
    [ContentType.SituationPage]: true,
    [ContentType.GuidePage]: true,
    [ContentType.GenericPage]: true,
    [ContentType.ThemedArticlePage]: true,
    [ContentType.Overview]: true,
    [ContentType.OfficePage]: true,
    [ContentType.FrontPage]: true,
    [ContentType.AreaPage]: true,
};
type Props = {
    content: ContentProps;
};

export const TopContainer = ({ content }: Props) => {
    const { __typename, breadcrumbs, isFailover, isPagePreview } = content;
    const hasDecoratorWidgets =
        breadcrumbs?.length > 0 || getContentLanguages(content)?.length > 0;
    const hasWhiteHeader = contentTypesWithWhiteHeader[__typename];
    // Should be shown in Content Studio only (except the edit view)
    const showVersionPicker =
        !!content.editorView && content.editorView !== 'edit';

    return (
        <>
            {isPagePreview && (
                <PageWarning
                    labelKey={'draftWarning'}
                    whiteBg={hasWhiteHeader}
                />
            )}
            {isFailover && (
                <PageWarning
                    labelKey={'failoverWarning'}
                    whiteBg={hasWhiteHeader}
                />
            )}
            <div
                className={classNames(
                    style.topContainer,
                    hasWhiteHeader && style.white,
                    hasDecoratorWidgets && style.widgetsOffset
                )}
            >
                {showVersionPicker && <VersionHistory content={content} />}
            </div>
        </>
    );
};
