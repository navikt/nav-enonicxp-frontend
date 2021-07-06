import React, { useEffect, useState } from 'react';
import { BEM } from '../../../../utils/classnames';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Undertittel } from 'nav-frontend-typografi';
import { VersionStatus } from './status/VersionStatus';
import { VersionSelector } from './selector/VersionSelector';
import './VersionHistory.less';

const bem = BEM('version-history');

type Props = {
    content: ContentProps;
};

export const VersionHistory = ({ content }: Props) => {
    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [dateTimeSubmitted, setDateTimeSubmitted] = useState<string | null>();

    const dateTimeRequested = dateTimeSubmitted || content.timeRequested;

    useEffect(() => {
        setDateTimeSubmitted(null);
    }, [content]);

    useEffect(() => {
        setSelectorIsOpen(false);
    }, [dateTimeSubmitted]);

    return (
        <div className={bem()}>
            {!dateTimeSubmitted && dateTimeRequested && (
                <VersionStatus
                    content={content}
                    requestedDateTime={dateTimeRequested}
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
                className={bem('toggle')}
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
                submitDateTime={setDateTimeSubmitted}
            />
            {dateTimeSubmitted && (
                <div className={bem('spinner-container')}>
                    <Undertittel>{'Laster historisk innhold...'}</Undertittel>
                    <NavFrontendSpinner className={bem('spinner')} />
                </div>
            )}
        </div>
    );
};
