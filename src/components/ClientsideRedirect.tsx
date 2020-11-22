import React, { useEffect } from 'react';
import { ExternalLinkProps } from '../types/content/external-link-props';
import { InternalLinkProps } from '../types/content/internal-link-props';
import { useRouter } from 'next/router';
import { SiteProps } from '../types/content/site-props';
import { getTargetIfRedirect } from '../utils/redirects';

// Redirects should now be handled in the catch-all router, leaving this in as a failsafe
export const ClientsideRedirect = (
    props: ExternalLinkProps | InternalLinkProps | SiteProps
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
