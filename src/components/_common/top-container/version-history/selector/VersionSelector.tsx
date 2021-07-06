import React, { useEffect, useState } from 'react';
import { BEM, classNames } from '../../../../../utils/classnames';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { getCurrentDateAndTime } from '../../../../../utils/datetime';
import { ContentProps } from '../../../../../types/content-props/_content-common';
import { Checkbox } from 'nav-frontend-skjema';
import { Button } from '../../../button/Button';
import { useRouter } from 'next/router';
import {
    xpContentPathPrefix,
    xpDraftPathPrefix,
} from '../../../../../utils/urls';
import './VersionSelector.less';

const bem = BEM('version-selector');

const startDate = '2019-12-01';

const getUrl = (
    content: ContentProps,
    date: string,
    time: string,
    branch: Branch
) => {
    const contentPath = content._path.split(xpContentPathPrefix)[1];
    const query = `?time=${date}T${time}&id=${content._id}${
        branch === 'draft' ? '&branch=draft' : ''
    }`;

    return content.editorView
        ? `${xpDraftPathPrefix}${query}`
        : `/version${contentPath}${query}`;
};

type Branch = 'master' | 'draft';

type Props = {
    content: ContentProps;
    isOpen: boolean;
    submitDateTime: (dateTime: string) => void;
};

export const VersionSelector = ({ content, isOpen, submitDateTime }: Props) => {
    const [initialDate, initialTime] = getCurrentDateAndTime();
    const [dateSelected, setDateSelected] = useState(initialDate);
    const [timeSelected, setTimeSelected] = useState(initialTime);
    const [branchSelected, setBranchSelected] = useState<Branch>(
        content.isDraft ? 'draft' : 'master'
    );

    const router = useRouter();

    useEffect(() => {
        const { timeRequested } = content;

        // Reset the current date/time selection when receiving live content
        if (!timeRequested) {
            const [currentDate, currentTime] = getCurrentDateAndTime();
            setDateSelected(currentDate);
            setTimeSelected(currentTime);
        }
    }, [content]);

    const url = getUrl(content, dateSelected, timeSelected, branchSelected);

    return (
        <div className={bem()}>
            <div
                className={classNames(
                    bem('inner'),
                    isOpen && bem('inner', 'open')
                )}
            >
                <div className={bem('input')}>
                    <div className={bem('input-left')}>
                        <Normaltekst>{'Velg tid og dato:'}</Normaltekst>
                        <input
                            type={'time'}
                            className={bem('time')}
                            onChange={(e) => {
                                setTimeSelected(e.target.value);
                            }}
                            value={timeSelected.slice(0, 5)}
                        />
                        <input
                            type={'date'}
                            className={bem('date')}
                            onChange={(e) => {
                                setDateSelected(e.target.value);
                            }}
                            min={startDate}
                            max={initialDate}
                            value={dateSelected}
                        />
                    </div>
                    <div className={bem('input-right')}>
                        {content.editorView && (
                            <Checkbox
                                label={'Kun publisert innhold'}
                                checked={branchSelected === 'master'}
                                id={'version-branch-input'}
                                onChange={(e) => {
                                    setBranchSelected(
                                        e.target.checked ? 'master' : 'draft'
                                    );
                                }}
                            />
                        )}
                        <Button
                            href={url}
                            kompakt={true}
                            mini={true}
                            className={bem('button')}
                            onClick={(e) => {
                                if (content.editorView) {
                                    e.stopPropagation();
                                }
                                e.preventDefault();
                                submitDateTime(
                                    `${dateSelected}T${timeSelected}`
                                );
                                router.push(url);
                            }}
                        >
                            {'Hent innhold'}
                        </Button>
                    </div>
                </div>
                {content.editorView && (
                    <div className={bem('help-text')}>
                        <hr />
                        <Undertekst>
                            {
                                'Av tekniske årsaker går denne versjonshistorikken kun tilbake til desember 2019. Ta kontakt med redaksjonen dersom du har behov for tidligere historikk.'
                            }
                        </Undertekst>
                    </div>
                )}
            </div>
        </div>
    );
};
