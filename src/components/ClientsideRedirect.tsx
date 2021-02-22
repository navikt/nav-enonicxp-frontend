import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTargetIfRedirect } from '../utils/redirects';
import { MediaProps } from '../types/media';
import { ContentProps } from '../types/content-props/_content-common';

// Redirects should now be handled in the catch-all router, leaving this in as a failsafe
export const ClientsideRedirect = (props: ContentProps | MediaProps) => {
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
