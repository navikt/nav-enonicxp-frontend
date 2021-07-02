import React, { useEffect, useState } from 'react';
import { Button } from '../../button/Button';
import { appOrigin, xpContentPathPrefix } from '../../../../utils/urls';
import { BEM, classNames } from '../../../../utils/classnames';
import { useRouter } from 'next/router';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import './VersionPicker.less';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { formatDateTime } from '../../../../utils/datetime';

const bem = BEM('version-picker');

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

    if (process.env.ENV === 'prod' && !content.editMode) {
        return null;
    }

    const path = content._path.split(xpContentPathPrefix)[1];
    const requestedTimeFormatted = formatDateTime(dateTimeRequested);
    const contentTimeFormatted = formatDateTime(contentTime);
    const requestUrl = `${appOrigin}/version${path}?time=${dateSelected}T${timeSelected}&id=${content._id}`;

    return (
        <div className={bem()}>
            {!waitingForContent && dateTimeRequested && (
                <Normaltekst className={bem('status')}>
                    {reqTimeIsValid
                        ? `Viser innhold fra ${requestedTimeFormatted}`
                        : `Innhold fra valgt tid ${requestedTimeFormatted} er ikke tilgjengelig - viser innhold fra ${contentTimeFormatted}`}
                </Normaltekst>
            )}
            <LenkeStandalone
                withChevron={false}
                href={'#'}
                onClick={() => setSelectorIsOpen(!selectorIsOpen)}
                className={bem('toggle')}
            >
                {'Velg historisk innhold'}
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
                        kompakt={true}
                        mini={true}
                        className={bem('button')}
                        onClick={() => {
                            if (dateSelected) {
                                router.push(requestUrl);
                                setSelectorIsOpen(false);
                                setWaitingForContent(true);
                                setDateTimeRequested(dateSelected);
                            }
                        }}
                    >
                        {'Hent historisk innhold'}
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
