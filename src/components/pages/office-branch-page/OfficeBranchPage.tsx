import React from 'react';
import { OfficeBranchPageProps } from 'types/content-props/dynamic-page-props';

import { LocalOfficePage } from './localOffice/LocalOfficePage';
import { GeneralOfficePage } from './generalOffice/GeneralOfficePage';
import { HMSOfficePage } from './hmsOffice/HMSOfficePage';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const { type } = props.data;

    if (type === 'LOKAL') {
        return <LocalOfficePage {...props} />;
    }
    if (type === 'HMS') {
        return <HMSOfficePage {...props} />;
    }

    return <GeneralOfficePage {...props} />;
};
