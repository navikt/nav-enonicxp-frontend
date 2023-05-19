import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';
import { getTargetIfRedirect } from 'utils/redirects';
import { BodyLong, Loader } from '@navikt/ds-react';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { ContentProps } from 'types/content-props/_content-common';
import { ErrorPage } from 'components/pages/error-page/ErrorPage';
import { make404Props } from 'utils/make-error-props';

import style from './RedirectPage.module.scss';

const getTarget = (props: ContentProps, isShadow: boolean) => {
    const target = getTargetIfRedirect(props);

    if (isShadow) {
        return `/shadow${target}`;
    }
    return target;
};

export const RedirectPage = (props: ContentProps) => {
    const { editorView, _path } = props;

    const router = useRouter();
    const [is404, setIs404] = useState(false);

    const isShadow = !!router.query?.shadowRouter;
    const shouldNotRedirect = !!editorView || isShadow;
    const target = getTarget(props, isShadow);

    useEffect(() => {
        // When viewed from the editor or a shadow page, we don't want to redirect. Instead we
        // render a page showing the redirect target, while also giving access to the version
        // history selector in the editor
        if (shouldNotRedirect) {
            return;
        }

        if (target) {
            router.push(target);
        } else {
            setIs404(true);
        }
    }, [target, shouldNotRedirect, _path, router]);

    return shouldNotRedirect ? (
        <div className={style.redirectPage}>
            <BodyLong size="medium">
                {`Dette er en redirect til `}
                <LenkeInline href={target}>{target}</LenkeInline>
            </BodyLong>
        </div>
    ) : is404 ? (
        <ErrorPage {...make404Props(_path)} />
    ) : (
        <div className={style.loader}>
            <Loader size={'3xlarge'} />
        </div>
    );
};
