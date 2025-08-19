import React from 'react';
import { ContentType } from 'types/content-props/_content-common';
import { RedirectPage } from 'components/pages/redirect-page/RedirectPage';
import { DynamicPage } from 'components/pages/dynamic-page/DynamicPage';
import { KapittelProps } from 'types/content-props/kapittel-props';

export const KapittelPage = (props: KapittelProps) => {
    if (props.data?.article?.type !== ContentType.Artikkel) {
        return <RedirectPage {...props} />;
    }

    return <DynamicPage {...props} />;
};
