import React, { useEffect, useState } from 'react';
import { Button } from '../../button/Button';
import { xpContentPathPrefix, xpDraftPathPrefix } from '../../../../utils/urls';
import { BEM, classNames } from '../../../../utils/classnames';
import { useRouter } from 'next/router';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import { VersionPickerStatus } from './status/VersionPickerStatus';
import { getCurrentDateAndTime } from '../../../../utils/datetime';
import './VersionPicker.less';

const bem = BEM('version-picker');

type Branch = 'master' | 'draft';

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

type Props = {
    content: ContentProps;
};

export const VersionPicker = ({ content }: Props) => {
    const [initialDate, initialTime] = getCurrentDateAndTime();

    const [waitingForContent, setWaitingForContent] = useState(false);
    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [dateSelected, setDateSelected] = useState(initialDate);
    const [timeSelected, setTimeSelected] = useState(initialTime);
    const [branchSelected, setBranchSelected] = useState<Branch>(
        content.isDraft ? 'draft' : 'master'
    );
    const [dateTimeRequested, setDateTimeRequested] = useState<
        string | undefined
    >(content.timeRequested);

    const router = useRouter();

    useEffect(() => {
        const { timeRequested } = content;

        setDateTimeRequested(timeRequested);
        setWaitingForContent(false);

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
            {!waitingForContent && dateTimeRequested && (
                <VersionPickerStatus
                    content={content}
                    requestedTime={dateTimeRequested}
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
            <div className={bem('selector-wrapper')}>
                <div
                    className={classNames(
                        bem('selector'),
                        selectorIsOpen && bem('selector', 'open')
                    )}
                >
                    <div className={bem('input')}>
                        <div className={bem('date-time-input')}>
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
                        <div className={bem('submit')}>
                            {content.editorView && (
                                <Checkbox
                                    label={'Kun publisert innhold'}
                                    checked={branchSelected === 'master'}
                                    id={'version-branch-input'}
                                    onChange={(e) => {
                                        setBranchSelected(
                                            e.target.checked
                                                ? 'master'
                                                : 'draft'
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
                                    setSelectorIsOpen(false);
                                    setWaitingForContent(true);
                                    setDateTimeRequested(
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
                                    'Av tekniske årsaker går denne versjonshistorikken kun tilbake til desember 2019. Ta kontakt med redaksjonen dersom du har behov for tidligere historikk. Vi jobber med å integrere dette i denne løsningen.'
                                }
                            </Undertekst>
                        </div>
                    )}
                </div>
            </div>
            {waitingForContent && (
                <div className={bem('spinner-container')}>
                    <Undertittel>{'Laster historisk innhold...'}</Undertittel>
                    <NavFrontendSpinner className={bem('spinner')} />
                </div>
            )}
        </div>
    );
};
