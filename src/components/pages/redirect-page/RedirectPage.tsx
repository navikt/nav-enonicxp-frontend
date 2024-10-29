import React, { useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { BodyLong, Loader } from '@navikt/ds-react';
import { getTargetIfRedirect } from 'utils/redirects';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { ContentProps } from 'types/content-props/_content-common';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

import style from './RedirectPage.module.scss';

// When viewed from the editor preview, we don't want to redirect. Instead we
// render a page showing the redirect target, while also giving access to the version
// history selector in the editor
export const RedirectPage = (props: ContentProps) => {
    const { editorView, noRedirect } = props;

    const router = useRouter();

    const target = getTargetIfRedirect(props);

    const shouldNotRedirect = !!editorView || noRedirect;

    useEffect(() => {
        if (shouldNotRedirect || !target) {
            return;
        }

        if (router) {
            router.push(target);
        } else {
            window.location.assign(target);
        }
    }, [target, shouldNotRedirect, router]);

    return shouldNotRedirect ? (
        <div className={style.redirectPage}>
            <BodyLong size="medium">
                {target ? (
                    <>
                        {'Dette er en redirect til '}
                        <LenkeInline href={target}>{target}</LenkeInline>
                    </>
                ) : (
                    <>{'Dette er en ugyldig redirect, url mangler!'} </>
                )}
            </BodyLong>
        </div>
    ) : target ? (
        <div className={style.loader}>
            <Loader size={'3xlarge'} />
        </div>
    ) : (
        <RedirectTo404 />
    );
};
