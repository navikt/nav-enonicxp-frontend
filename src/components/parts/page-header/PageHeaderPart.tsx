import React from 'react';
import { PageHeader } from 'components/_common/headers/page-header/PageHeader';
import { classNames } from 'utils/classnames';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { PartComponent, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

import style from './PageHeaderPart.module.scss';

export const PageHeaderPart: PartComponent<PartType.PageHeader> = ({ config }) => {
    const { type, data } = usePageContentProps();
    const audience = data?.audience;

    const isProviderSubPage =
        type === ContentType.FrontPageNested && getAudience(audience) === Audience.PROVIDER;

    return (
        <div className={classNames(style.wrapper, isProviderSubPage && style.providerSubPage)}>
            <PageHeader className={classNames(style.pageHeader)}>{config.title}</PageHeader>
        </div>
    );
};
