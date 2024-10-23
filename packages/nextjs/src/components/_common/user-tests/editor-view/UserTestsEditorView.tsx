import React from 'react';
import { BodyLong, Detail } from '@navikt/ds-react';
import { UserTestsComponentProps } from 'components/_common/user-tests/UserTests';
import { UserTestVariant } from 'components/_common/user-tests/variants/UserTestVariant';
import { formatDateTime, isCurrentTimeInRange } from 'utils/datetime';
import { classNames } from 'utils/classnames';

import style from './UserTestsEditorView.module.scss';

export const UserTestsEditorView = ({ tests, selectedTestIds }: UserTestsComponentProps) => {
    const { data } = tests;

    const { variants, startTime, endTime } = data;

    const fromString = startTime ? ` fra ${formatDateTime(startTime, 'nb', true)}` : '';
    const toString = endTime ? ` til ${formatDateTime(endTime, 'nb', true)}` : '';

    const hasDateTimeRange = fromString || toString;

    const isActive = isCurrentTimeInRange(startTime, endTime);

    return (
        <div className={style.userTestsEditor}>
            <div className={style.header}>
                <BodyLong>
                    {'Denne brukertesten er '}
                    <strong>{isActive ? 'aktiv' : 'ikke aktiv'}</strong>
                </BodyLong>
                <Detail>
                    {hasDateTimeRange ? `Aktivert${fromString}${toString}` : 'Ingen tidsbegrensing'}
                </Detail>
            </div>
            {variants.map((variant) => {
                const { id, percentage } = variant;
                const isSelected = selectedTestIds.length === 0 || selectedTestIds.includes(id);

                return (
                    <div key={id} className={style.variant}>
                        <Detail>
                            {'Variant id: '}
                            <strong>{id}</strong>
                            {' - Andel: '}
                            <strong>{`${percentage}%`}</strong>
                            {!isSelected && ' (ikke aktivert i denne komponenten)'}
                        </Detail>
                        <UserTestVariant
                            testsData={data}
                            variant={variant}
                            className={classNames(!isSelected && style.disabled)}
                        />
                    </div>
                );
            })}
        </div>
    );
};
