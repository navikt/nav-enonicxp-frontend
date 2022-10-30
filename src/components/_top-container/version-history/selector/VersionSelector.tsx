import React, { useEffect, useState } from 'react';
import { classNames } from 'utils/classnames';
import { BodyLong, Heading, Loader, Radio, RadioGroup } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { VersionSelectorDateTime } from './selected-datetime/VersionSelectorDateTime';
import { VersionSelectorPublished } from './published-datetime/VersionSelectorPublished';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { xpServiceUrl } from 'utils/urls';

import style from './VersionSelector.module.scss';

const containerId = 'version-selector';

type SelectorType = 'datetime' | 'published';
type Props = {
    content: ContentProps;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelector = ({
    content,
    isOpen,
    setIsOpen,
    submitVersionUrl,
}: Props) => {
    const [publishedVersions, setPublishedVersions] = useState<string[] | null>(
        null
    );
    const [selectedPublishedVersion, setSelectedPublishedVersion] = useState<
        string | null
    >(null);
    const [selectorType, setSelectorType] = useState<SelectorType>('datetime');

    useEffect(() => {
        fetchJson<string[]>(
            `${xpServiceUrl}/sitecontentVersions/publishedVersions?id=${content._id}`
        ).then((versions) => {
            if (!versions) {
                setPublishedVersions([]);
                return;
            }

            setPublishedVersions(versions);

            // Set the selection to a specific version if it was previously selected by the user
            const selectedVersion = versions.find(
                (versionTimestamp) => versionTimestamp === content.timeRequested
            );

            if (!selectedVersion) {
                return;
            }

            setSelectedPublishedVersion(selectedVersion);
            setSelectorType('published');
        });
    }, [content]);

    useEffect(() => {
        // Close the selector if the user clicks outside the selector element
        const closeSelector = (e: MouseEvent) => {
            const clickedMe = !!(e.target as HTMLElement)?.closest?.(
                `#${containerId}`
            );
            if (!clickedMe) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('click', closeSelector);
        } else {
            document.removeEventListener('click', closeSelector);
        }

        return () => {
            document.removeEventListener('click', closeSelector);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div className={style.versionSelector} id={containerId}>
            <div className={classNames(style.inner, isOpen && style.open)}>
                <div className={style.typeSelector}>
                    <RadioGroup
                        legend={'Velg tidspunkt'}
                        value={selectorType}
                        onChange={(value) => {
                            setSelectorType(value as SelectorType);
                        }}
                        disabled={!publishedVersions}
                    >
                        <Radio value={'datetime'}>
                            {'Egendefinert tidspunkt'}
                        </Radio>
                        <Radio value={'published'}>
                            {'Publiseringstidspunkt'}
                        </Radio>
                    </RadioGroup>
                </div>
                <div className={style.input}>
                    {publishedVersions ? (
                        selectorType === 'datetime' ? (
                            <VersionSelectorDateTime
                                content={content}
                                submitVersionUrl={submitVersionUrl}
                            />
                        ) : selectorType === 'published' ? (
                            <VersionSelectorPublished
                                content={content}
                                versionTimestamps={publishedVersions}
                                submitVersionUrl={submitVersionUrl}
                                initialSelection={selectedPublishedVersion}
                            />
                        ) : (
                            <div>{'Feil: velg en input-type'}</div>
                        )
                    ) : (
                        <div className={style.spinnerContainer}>
                            <Heading size="medium" level="2">
                                {'Laster versjonshistorikk...'}
                            </Heading>
                            <Loader size={'2xlarge'} />
                        </div>
                    )}
                </div>
                <div>
                    <hr />
                    <BodyLong size="small">
                        {
                            'Denne historikken går kun tilbake til desember 2019. Ta kontakt med redaksjonen dersom du har behov for tidligere historikk.'
                        }
                    </BodyLong>
                </div>
            </div>
        </div>
    );
};
