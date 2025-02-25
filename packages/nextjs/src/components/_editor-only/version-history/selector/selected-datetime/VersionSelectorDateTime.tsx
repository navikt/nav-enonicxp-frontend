import React, { useState } from 'react';
import { Checkbox, Label } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { ContentProps } from 'types/content-props/_content-common';
import { getCurrentDateAndTime, getCurrentISODate, getUtcTimeFromLocal } from 'utils/datetime';
import { Branch } from 'types/branch';
import { getVersionSelectorUrl } from 'components/_editor-only/version-history/selector/versionSelectorUtils';
import { VersionSelectorSubmitButton } from 'components/_editor-only/version-history/selector/submit-button/VersionSelectorSubmitButton';

import style from './VersionSelectorDateTime.module.scss';

const startDate = '2019-12-01';
type Props = {
    content: ContentProps;
    submitVersionUrl: (url: string) => void;
};

export const VersionSelectorDateTime = ({ content, submitVersionUrl }: Props) => {
    const { timeRequested } = content;

    const nbTime = dayjs(timeRequested).locale('nb').format();

    const [initialDate, initialTime] = timeRequested ? nbTime.split('T') : getCurrentDateAndTime();

    const [dateSelected, setDateSelected] = useState(initialDate);
    const [timeSelected, setTimeSelected] = useState(initialTime);
    const [branchSelected, setBranchSelected] = useState<Branch>('master');

    const url = getVersionSelectorUrl(
        content,
        getUtcTimeFromLocal(`${dateSelected}T${timeSelected}`),
        branchSelected
    );

    return (
        <>
            <div className={style.left}>
                <Label id={'version-selector-label'}>{'Velg tid og dato:'}</Label>
                <input
                    type={'time'}
                    className={style.time}
                    onChange={(e) => {
                        setTimeSelected(e.target.value);
                    }}
                    aria-labelledby={'version-selector-label'}
                    value={timeSelected.slice(0, 5)}
                />
                <input
                    type={'date'}
                    className={style.date}
                    onChange={(e) => {
                        setDateSelected(e.target.value);
                    }}
                    aria-labelledby={'version-selector-label'}
                    min={startDate}
                    max={getCurrentISODate()}
                    value={dateSelected}
                />
            </div>
            <div className={style.right}>
                <Checkbox
                    checked={branchSelected === 'master'}
                    id={'version-branch-input'}
                    onChange={(e) => {
                        setBranchSelected(e.target.checked ? 'master' : 'draft');
                    }}
                    size={'small'}
                >
                    {'Kun publisert innhold'}
                </Checkbox>
                <VersionSelectorSubmitButton url={url} submitVersionUrl={submitVersionUrl} />
            </div>
        </>
    );
};
