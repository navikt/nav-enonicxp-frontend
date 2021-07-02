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
import './VersionPicker.less';

const bem = BEM('version-picker');

const getUrl = (
    content: ContentProps,
    dateSelected: string,
    timeSelected: string
) => {
    const contentPath = content._path.split(xpContentPathPrefix)[1];
    const query = `?time=${dateSelected}T${timeSelected}&id=${content._id}`;

    return content.editMode
        ? `${xpDraftPathPrefix}${query}`
        : `/version${contentPath}${query}`;
};

type Props = {
    content: ContentProps;
};

export const VersionPicker = ({ content }: Props) => {
    const [currentDate, currentTime] = new Date().toISOString().split(/[T.]/);
    const contentTime = content.modifiedTime || content.createdTime;

    const [waitingForContent, setWaitingForContent] = useState(false);
    const [selectorIsOpen, setSelectorIsOpen] = useState(false);
    const [dateSelected, setDateSelected] = useState(currentDate);
    const [timeSelected, setTimeSelected] = useState(currentTime);

    const [dateTimeRequested, setDateTimeRequested] = useState<
        string | undefined
    >(content.timeRequested);
    const [reqTimeIsValid, setReqTimeIsValid] = useState(true);

    const router = useRouter();

    useEffect(() => {
        setWaitingForContent(false);
        setDateTimeRequested(content.timeRequested);
        if (dateTimeRequested) {
            const contentUnixTime = new Date(contentTime).getTime();
            const requestedUnixTime = new Date(dateTimeRequested).getTime();
            setReqTimeIsValid(requestedUnixTime >= contentUnixTime);
        }
    }, [content]);

    const requestedTimeFormatted = formatDateTime(dateTimeRequested);
    const contentTimeFormatted = formatDateTime(contentTime);
    const url = getUrl(content, dateSelected, timeSelected);

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
                        {'Tilbake til live'}
                    </LenkeStandalone>
                </div>
            )}
            <LenkeStandalone
                withChevron={false}
                href={'#'}
                onClick={() => setSelectorIsOpen(!selectorIsOpen)}
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
            {waitingForContent && (
                <div className={bem('spinner-container')}>
                    <Undertittel>{'Laster historisk innhold...'}</Undertittel>
                    <NavFrontendSpinner className={bem('spinner')} />
                </div>
            )}
        </div>
    );
};
