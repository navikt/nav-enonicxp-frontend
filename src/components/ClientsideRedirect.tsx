import React, { useEffect } from 'react';
import { ExternalLinkProps } from '../types/content-props/external-link-props';
import { InternalLinkProps } from '../types/content-props/internal-link-props';
import { useRouter } from 'next/router';
import { SiteProps } from '../types/content-props/site-props';
import { getTargetIfRedirect } from '../utils/redirects';
import { UrlProps } from '../types/content-props/url-props';

// Redirects should now be handled in the catch-all router, leaving this in as a failsafe
export const ClientsideRedirect = (
    props: ExternalLinkProps | InternalLinkProps | SiteProps | UrlProps
) => {
    const router = useRouter();

    useEffect(() => {
        const target = getTargetIfRedirect(props);
        if (target) {
            console.log(`Redirecting from ${props._path} to ${target}`);
            router.push(target);
        }
    }, []);

    return null;
};
