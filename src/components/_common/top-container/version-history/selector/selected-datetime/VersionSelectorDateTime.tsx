import React, { useEffect, useState } from 'react';
import { Label } from '@navikt/ds-react';
import { Checkbox } from 'nav-frontend-skjema';
import { Button } from '../../../../button/Button';
import { BEM } from '../../../../../../utils/classnames';
import { ContentProps } from '../../../../../../types/content-props/_content-common';
import {
    getCurrentDateAndTime,
    getUtcTimeFromLocal,
} from '../../../../../../utils/datetime';
import { Branch } from '../../../../../../types/branch';
import { getVersionSelectorUrl } from '../versionSelectorUtils';
import './VersionSelectorDateTime.less';

const startDate = '2019-12-01';

const bem = BEM('version-selector-datetime');

type Props = {
    content: ContentProps;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorDateTime = ({
    content,
    submitVersionUrl,
}: Props) => {
    const [initialDate, initialTime] = getCurrentDateAndTime();
    const [dateSelected, setDateSelected] = useState(initialDate);
    const [timeSelected, setTimeSelected] = useState(initialTime);
    const [branchSelected, setBranchSelected] = useState<Branch>('master');

    const { editorView, timeRequested } = content;

    const url = getVersionSelectorUrl(
        content,
        getUtcTimeFromLocal(`${dateSelected}T${timeSelected}`),
        branchSelected
    );

    useEffect(() => {
        // Reset the current date/time selection when receiving live content
        if (!timeRequested) {
            const [currentDate, currentTime] = getCurrentDateAndTime();
            setDateSelected(currentDate);
            setTimeSelected(currentTime);
        }
    }, [timeRequested]);

    return (
        <>
            <div className={bem('left')}>
                <Label>{'Velg tid og dato:'}</Label>
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
            <div className={bem('right')}>
                {editorView && (
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
                    className={bem('button')}
                    onClick={(e) => {
                        if (editorView) {
                            e.stopPropagation();
                        }
                        e.preventDefault();
                        submitVersionUrl(url);
                    }}
                    prefetch={false}
                    disabled={!url}
                >
                    {'Hent innhold'}
                </Button>
            </div>
        </>
    );
};
