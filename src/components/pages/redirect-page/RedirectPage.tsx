import { useEffect } from 'react';
import { ExternalLinkProps } from '../../../types/content-props/external-link-props';
import { InternalLinkProps } from '../../../types/content-props/internal-link-props';
import { useRouter } from 'next/router';
import { SiteProps } from '../../../types/content-props/site-props';
import { getTargetIfRedirect } from '../../../utils/redirects';
import { UrlProps } from '../../../types/content-props/url-props';
import { BodyLong } from '@navikt/ds-react';
import { LenkeInline } from '../../_common/lenke/LenkeInline';

export const RedirectPage = (
    props: ExternalLinkProps | InternalLinkProps | SiteProps | UrlProps
) => {
    const { editorView, _path } = props;
    const router = useRouter();
    const target = getTargetIfRedirect(props);

    useEffect(() => {
        // When viewed from the editor, we don't want to redirect. Instead we
        // render a page showing the redirect target, while also giving access
        // to the version history selector
        if (editorView) {
            return;
        }

        if (target) {
            console.log(`Redirecting from ${_path} to ${target}`);
            router.push(target);
        }
    }, [target, editorView, _path, router]);

    return editorView ? (
        <div className={'redirect-page'}>
            <BodyLong size="medium">
                {`Dette er en redirect til `}
                <LenkeInline href={target}>{target}</LenkeInline>
            </BodyLong>
        </div>
    ) : null;
};
