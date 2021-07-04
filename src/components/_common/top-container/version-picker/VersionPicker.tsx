import React, { useEffect, useState } from 'react';
import { Button } from '../../button/Button';
import { xpContentPathPrefix, xpDraftPathPrefix } from '../../../../utils/urls';
import { BEM, classNames } from '../../../../utils/classnames';
import { useRouter } from 'next/router';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { formatDateTime } from '../../../../utils/datetime';
import { Checkbox } from 'nav-frontend-skjema';
import './VersionPicker.less';

const bem = BEM('version-picker');

type Branch = 'master' | 'draft';

const getUrl = (
    content: ContentProps,
    date: string,
    time: string,
    branch: Branch
) => {
    const contentPath = content._path.split(xpContentPathPrefix)[1];
    const query = `?time=${date}T${time}&id=${content._id}&branch=${branch}`;

    return content.editMode
        ? `${xpDraftPathPrefix}${query}`
        : `/version${contentPath}${query}`;
};

type Props = {
    content: ContentProps;
};

export const VersionPicker = ({ content }: Props) => {
    const contentDateTime = content.modifiedTime || content.createdTime;
    const [currentDate, currentTime] = contentDateTime.split(/[T.]/);

    const [waitingForContent, setWaitingForContent] = useState(false);
    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [dateSelected, setDateSelected] = useState(currentDate);
    const [timeSelected, setTimeSelected] = useState(currentTime);
    const [branchSelected, setBranchSelected] = useState<Branch>(
        content.editMode ? 'draft' : 'master'
    );

    const [dateTimeRequested, setDateTimeRequested] = useState<
        string | undefined
    >(content.timeRequested);
    const [reqTimeIsValid, setReqTimeIsValid] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setWaitingForContent(false);
        setDateTimeRequested(content.timeRequested);
        if (dateTimeRequested) {
            const contentUnixTime = new Date(contentDateTime).getTime();
            const requestedUnixTime = new Date(dateTimeRequested).getTime();
            setReqTimeIsValid(requestedUnixTime >= contentUnixTime);
        }
    }, [content]);

    const requestedTimeFormatted = formatDateTime(dateTimeRequested);
    const contentTimeFormatted = formatDateTime(contentDateTime);
    const url = getUrl(content, dateSelected, timeSelected, branchSelected);

    return (
        <div className={bem()}>
            {!waitingForContent && dateTimeRequested && (
                <div className={bem('status')}>
                    <Normaltekst>
                        {reqTimeIsValid
                            ? `Viser innhold fra ${requestedTimeFormatted}`
                            : `Innhold fra valgt tid ${requestedTimeFormatted} finnes ikke - viser innhold fra ${contentTimeFormatted}`}
                    </Normaltekst>
                    <LenkeStandalone
                        withChevron={false}
                        href={content.livePath}
                        className={bem('back-to-live')}
                    >
                        {'Tilbake til dagens'}
                    </LenkeStandalone>
                </div>
            )}
            <LenkeStandalone
                withChevron={false}
                href={''}
                onClick={(e) => {
                    if (content.editorView === 'inline') {
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
                        <Normaltekst>{'Velg tid og dato:'}</Normaltekst>
                        <input
                            type={'time'}
                            className={bem('time')}
                            onInput={(e: any) => {
                                setTimeSelected(e.target.value);
                            }}
                            value={timeSelected.slice(0, 5)}
                        />
                        <input
                            type={'date'}
                            className={bem('date')}
                            onInput={(e: any) => {
                                setDateSelected(e.target.value);
                            }}
                            min={'2019-12-01'}
                            max={currentDate}
                            value={dateSelected}
                        />
                    </div>
                    <div className={bem('submit')}>
                        <Checkbox
                            label={'Kun publisert innhold'}
                            checked={branchSelected === 'master'}
                            id={'version-branch-input'}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setBranchSelected(
                                    e.target.checked ? 'master' : 'draft'
                                );
                            }}
                        />
                        <Button
                            href={url}
                            kompakt={true}
                            mini={true}
                            className={bem('button')}
                            onClick={(e) => {
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
