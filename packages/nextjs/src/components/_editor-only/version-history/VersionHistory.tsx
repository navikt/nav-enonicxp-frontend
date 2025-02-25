import React, { useEffect, useState } from 'react';
import { Heading, Loader } from '@navikt/ds-react';
import { useRouter } from 'next/compat/router';
import { logger } from '@/shared/logger';
import { ContentProps } from 'types/content-props/_content-common';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { translator } from 'translations';
import { Chevron } from 'components/_common/chevron/Chevron';
import { VersionSelector } from './selector/VersionSelector';
import { VersionStatus } from './status/VersionStatus';

import style from './VersionHistory.module.scss';

type Props = {
    content: ContentProps;
};

export const VersionHistory = ({ content }: Props) => {
    const { timeRequested, language } = content;

    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [versionUrlRequested, setVersionUrlRequested] = useState<string | null>();

    const router = useRouter();
    const getLabel = translator('versionHistory', language);

    useEffect(() => {
        setVersionUrlRequested(null);
        setSelectorIsOpen(false);
    }, [content]);

    useEffect(() => {
        setSelectorIsOpen(false);
        if (versionUrlRequested) {
            router?.push(versionUrlRequested).catch((err) => {
                logger.info(`Error during version history navigation: ${err}`);
                setVersionUrlRequested(null);
            });
        }
    }, [versionUrlRequested, router]);

    return (
        <nav className={style.versionHistory} aria-label={getLabel('label')}>
            {!versionUrlRequested && timeRequested && (
                <VersionStatus
                    content={content}
                    requestedDateTime={timeRequested}
                    submitVersionUrl={setVersionUrlRequested}
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
                {getLabel('title')}
                <Chevron direction={selectorIsOpen ? 'Up' : 'Down'} />
            </LenkeStandalone>
            <VersionSelector
                content={content}
                isOpen={selectorIsOpen}
                setIsOpen={setSelectorIsOpen}
                submitVersionUrl={setVersionUrlRequested}
            />
            {versionUrlRequested && (
                <div className={style.spinnerContainer}>
                    <Heading size="medium" level="2">
                        {getLabel('loading')}
                    </Heading>
                    <Loader size={'2xlarge'} />
                </div>
            )}
        </nav>
    );
};
