import React, { useState, useEffect } from 'react';
import { Accordion } from '@navikt/ds-react';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { classNames } from 'utils/classnames';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { AlertBox } from 'components/_common/alert-box/AlertBox';

import style from './ProductPanelExpandable.module.scss';

type Props = {
    title: string;
    illustration: AnimatedIconsProps;
    visible: boolean;
    anchorId: string;
    contentLoaderCallback: () => void;
    analyticsData?: Record<string, string>;
    error?: string;
    children: React.ReactNode;
};

export const ProductPanelExpandable = ({
    title,
    anchorId,
    illustration,
    visible,
    contentLoaderCallback,
    analyticsData,
    error,
    children,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const anchorIdWithHash = `#${anchorId}`;

    useEffect(() => {
        if (window.location.hash === anchorIdWithHash) {
            contentLoaderCallback();
            setIsOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorIdWithHash]);

    const handleClick = () => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: title,
                ...analyticsData,
            }
        );

        setIsOpen(!isOpen);
        contentLoaderCallback();
    };

    return (
        <>
            <div id={anchorId} />
            <Accordion className={classNames(!visible && style.hidden)}>
                <Accordion.Item open={isOpen} className={style.accordionItem}>
                    <Accordion.Header
                        onClick={handleClick}
                        onMouseOver={contentLoaderCallback}
                    >
                        <IllustrationStatic
                            className={style.illustration}
                            illustration={illustration}
                        />
                        {title}
                    </Accordion.Header>
                    <Accordion.Content>
                        <CopyLink
                            anchor={anchorIdWithHash}
                            className={style.copyLink}
                        />
                        {error && (
                            <AlertBox variant={'error'}>{error}</AlertBox>
                        )}
                        {children}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </>
    );
};
