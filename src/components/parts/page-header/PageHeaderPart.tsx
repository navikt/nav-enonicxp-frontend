import React from 'react';
import { PageHeaderProps } from '../../../types/component-props/part-configs/page-header';
import { PageHeader } from '../../_common/headers/page-header/PageHeader';
import { classNames } from 'utils/classnames';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';

import style from './PageHeaderPart.module.scss';

export const PageHeaderPart = (props: PageHeaderProps) => {
    const { config, pageProps } = props;
    const { type, data } = pageProps;
    const audience = data?.audience;

    const isProviderSubPage =
        type === ContentType.FrontPageNested &&
        getAudience(audience) === Audience.PROVIDER;

    return (
        <div
            className={classNames(
                style.wrapper,
                isProviderSubPage && style.providerSubPage
            )}
        >
            <PageHeader className={classNames(style.pageHeader)}>
                {config.title}
            </PageHeader>
        </div>
    );
};
