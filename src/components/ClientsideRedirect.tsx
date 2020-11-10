import React, { useEffect } from 'react';
import { ExternalLinkProps } from '../types/content-types/external-link-props';
import { InternalLinkProps } from '../types/content-types/internal-link-props';
import { ContentType } from '../types/content-types/_schema';
import { useRouter } from 'next/router';
import { enonicPathToAppPath } from '../utils/paths';
import { SiteProps } from '../types/content-types/site-props';

// Redirects should now be handled in the catch-all router, leaving this in as a failsafe for now
export const ClientsideRedirect = (
    props: ExternalLinkProps | InternalLinkProps | SiteProps
) => {
    const router = useRouter();

    useEffect(() => {
        console.log(`Redirecting from ${props._path}`);
        if (props.__typename === ContentType.ExternalLink) {
            document.location.replace(props.data.url);
        } else if (props.__typename === ContentType.InternalLink) {
            router.push(enonicPathToAppPath(props.data.target._path));
        } else if (props.__typename === ContentType.Site) {
            router.push('/no/person');
        }
    }, []);

    return null;
};
