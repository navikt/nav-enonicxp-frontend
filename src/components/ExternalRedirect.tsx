import React from 'react';
import { useEffect } from 'react';
import { ExternalLinkProps } from '../types/content-types/external-link-props';

export const ExternalRedirect = (props: ExternalLinkProps) => {
    useEffect(() => {
        document.location.replace(props.data.url);
    }, []);

    return null;
};
