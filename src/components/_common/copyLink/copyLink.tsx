import React, { useEffect, useState } from 'react';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { CopyButton } from "@navikt/ds-react";

import style from './copyLink.module.scss';

type CopyLinkProps = {
    anchor: string;
    heading: string;
    className?: string;
    label?: string;
};

export const CopyLink = ({ anchor, heading, label, className }: CopyLinkProps) => {
    const [linkToCopy, setLinkToCopy] = useState<string>('');
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getLabel = translator('header', language);

    useEffect(() => {
        setLinkToCopy(() => `${window.location.href}${anchor}`);
    }, [anchor]);

    if (!anchor) {
        return null;
    }

    const onActiveChange = (state:boolean) => {
        if (state) {
            logAmplitudeEvent(AnalyticsEvents.COPY_LINK, {
                seksjon: layoutConfig.title,
            });
        }
    }

    return (
        <CopyButton
            className={classNames(className, style.copyLink)}
            size="small"
            text={label || getLabel('copyLink')}
            aria-label={`${getLabel('copyLinkTo')}: "${heading}"`}
            activeText={getLabel('copiedLinkConfirmed')}
            copyText={linkToCopy}
            onActiveChange={onActiveChange}
        />
    );
};
