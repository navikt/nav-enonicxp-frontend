import React from 'react';
import { PageHeaderProps } from '../../../types/component-props/parts/page-header';
import { PageHeader } from '../../_common/headers/page-header/PageHeader';

import styles from './PageHeaderPart.module.scss';
import { classNames } from 'utils/classnames';
import { ContentType } from 'types/content-props/_content-common';
import { Audience, getAudience } from 'types/component-props/_mixins';

export const PageHeaderPart = (props: PageHeaderProps) => {
    const { config, pageProps } = props;
    const { type } = pageProps;
    const { audience } = pageProps.data;

    const isProviderSubPage =
        type === ContentType.FrontPageNested &&
        getAudience(audience) === Audience.PROVIDER;

    return (
        <div
            className={classNames(
                styles.wrapper,
                isProviderSubPage && styles.providerSubPage
            )}
        >
            <PageHeader className={classNames(styles.pageHeader)}>
                {config.title}
            </PageHeader>
        </div>
    );
};
