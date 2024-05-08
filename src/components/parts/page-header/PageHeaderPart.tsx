import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { classNames } from 'utils/classnames';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';

import style from './PageHeaderPart.module.scss';

export type PartConfigPageHeader = {
    title: string;
};

export const PageHeaderPart = ({ config }: PartComponentProps<PartType.PageHeader>) => {
    const { type, data } = usePageContentProps();
    const audience = data?.audience;

    const isProviderSubPage =
        type === ContentType.FrontPageNested && getAudience(audience) === Audience.PROVIDER;

    return (
        <div className={classNames(style.wrapper, isProviderSubPage && style.providerSubPage)}>
            <Header className={classNames(style.pageHeader)} level="1" size="xlarge">
                {config.title}
            </Header>
        </div>
    );
};
