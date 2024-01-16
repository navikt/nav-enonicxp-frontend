import React from 'react';
import { OfficeBranchPageProps } from 'types/content-props/dynamic-page-props';

import { LocalOfficePage } from './localOffice/LocalOfficePage';
import { GeneralOfficePage } from './localOffice/GeneralOfficePage';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const { type } = props.data;

    if (type === 'LOKAL') {
        return <LocalOfficePage {...props} />;
    }

    return <GeneralOfficePage {...props} />;
};
