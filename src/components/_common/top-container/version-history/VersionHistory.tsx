import React, { useEffect, useState } from 'react';
import { BEM } from '../../../../utils/classnames';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { VersionStatus } from './status/VersionStatus';
import { VersionSelector } from './selector/VersionSelector';
import { useRouter } from 'next/router';
import './VersionHistory.less';

const bem = BEM('version-history');

type Props = {
    content: ContentProps;
};

export const VersionHistory = ({ content }: Props) => {
    const { timeRequested } = content;

    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [versionUrlRequested, setVersionUrlRequested] = useState<
        string | null
    >();

    const router = useRouter();

    useEffect(() => {
        setVersionUrlRequested(null);
    }, [content]);

    useEffect(() => {
        setSelectorIsOpen(false);
        if (versionUrlRequested) {
            router.push(versionUrlRequested);
        }
    }, [versionUrlRequested, router]);

    return (
        <div className={bem()}>
            {!versionUrlRequested && timeRequested && (
                <VersionStatus
                    content={content}
                    requestedDateTime={timeRequested}
                />
            )}
            <LenkeStandalone
                withChevron={false}
                href={'#'}
                onClick={(e) => {
                    if (content.editorView) {
                        e.stopPropagation();
                    }
                    e.preventDefault();
                    setSelectorIsOpen(!selectorIsOpen);
                }}
            >
                {'Vis historisk innhold'}
                <NavFrontendChevron
                    type={selectorIsOpen ? 'opp' : 'ned'}
                    className={bem('toggle-chevron')}
                />
            </LenkeStandalone>
            <VersionSelector
                content={content}
                isOpen={selectorIsOpen}
                submitVersionUrl={setVersionUrlRequested}
            />
            {versionUrlRequested && (
                <div className={bem('spinner-container')}>
                    <Undertittel>{'Laster historisk innhold...'}</Undertittel>
                    <NavFrontendSpinner className={bem('spinner')} />
                </div>
            )}
        </div>
    );
};
