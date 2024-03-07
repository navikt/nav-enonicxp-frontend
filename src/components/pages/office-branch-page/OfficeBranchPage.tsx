import React from 'react';
import { OfficeBranchPageProps } from 'types/content-props/dynamic-page-props';
import { OfficePageHeader } from '../../_common/headers/office-page-header/OfficePageHeader';
import { OfficeDetails } from 'components/_common/office-details/OfficeDetails';
import { classNames } from 'utils/classnames';
import { logger } from 'srcCommon/logger';

import { LocalOfficePage } from './localOffice/LocalOfficePage';
import { GeneralOfficePage } from './localOffice/GeneralOfficePage';

export const OfficeBranchPage = (props: OfficeBranchPageProps) => {
    const { type } = props.data;

    if (type === 'LOKAL') {
        return <LocalOfficePage {...props} />;
    }

    return <GeneralOfficePage {...props} />;
};
