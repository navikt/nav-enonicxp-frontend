import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTargetIfRedirect } from '../../../utils/redirects';
import { BodyLong } from '@navikt/ds-react';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { ContentProps } from '../../../types/content-props/_content-common';
import { stripXpPathPrefix } from '../../../utils/urls';

export const RedirectPage = (props: ContentProps) => {
    const { editorView, _path } = props;
    const router = useRouter();
    const target = getTargetIfRedirect(props) || stripXpPathPrefix(_path);

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
