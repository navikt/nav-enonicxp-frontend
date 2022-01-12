import React, { useEffect, useState } from 'react';
import { BEM, classNames } from '../../../../../utils/classnames';
import { BodyLong, Radio, RadioGroup } from '@navikt/ds-react';
import { ContentProps } from '../../../../../types/content-props/_content-common';
import { VersionSelectorDateTime } from './selected-datetime/VersionSelectorDateTime';
import { VersionSelectorPublished } from './published-datetime/VersionSelectorPublished';

const bem = BEM('version-selector');

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
    const [selectorType, setSelectorType] = useState<SelectorType>('datetime');

    const { editorView } = content;

    useEffect(() => {
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
        <div className={bem()} id={containerId}>
            <div
                className={classNames(
                    bem('inner'),
                    isOpen && bem('inner', 'open')
                )}
            >
                <div className={bem('type-selector')}>
                    <RadioGroup
                        legend={'Velg input-type'}
                        onChange={(value) => {
                            setSelectorType(value as SelectorType);
                        }}
                    >
                        <Radio value={'datetime'} defaultChecked={true}>
                            {'Egendefinert tidspunkt'}
                        </Radio>
                        <Radio value={'published'}>
                            {'Publiseringstidspunkt'}
                        </Radio>
                    </RadioGroup>
                </div>
                <div className={bem('input')}>
                    {selectorType === 'datetime' ? (
                        <VersionSelectorDateTime
                            content={content}
                            submitVersionUrl={submitVersionUrl}
                        />
                    ) : selectorType === 'published' ? (
                        <VersionSelectorPublished
                            content={content}
                            submitVersionUrl={submitVersionUrl}
                        />
                    ) : (
                        <div>{'Feil: velg en input-type'}</div>
                    )}
                </div>
                {editorView && (
                    <div className={bem('help-text')}>
                        <hr />
                        <BodyLong size="small">
                            {
                                'Denne historikken går foreløpig kun tilbake til desember 2019. Ta kontakt med redaksjonen dersom du har behov for tidligere historikk.'
                            }
                        </BodyLong>
                    </div>
                )}
            </div>
        </div>
    );
};
