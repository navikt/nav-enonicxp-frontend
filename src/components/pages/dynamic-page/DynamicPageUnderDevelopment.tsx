import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import ErrorPage404 from '../../../pages/404';
import { DynamicPage } from './DynamicPage';

export const DynamicPageUnderDevelopment = (props: ContentProps) => {
    if (!props.editMode && process.env.ENV === 'prod') {
        return <ErrorPage404 />;
    }

    return <DynamicPage {...props} />;
};
