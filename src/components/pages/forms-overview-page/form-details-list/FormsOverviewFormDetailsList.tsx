import React from 'react';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { FormDetailsPanel } from 'components/pages/forms-overview-page/form-details-list/form-details-item/FormDetailsItem';

export const FormsOverviewFormDetailsList = (props: FormsOverviewProps) => {
    const { data } = props;
    const { formDetailsList } = data;

    return (
        <div>
            {formDetailsList.map((formDetail) => (
                <FormDetailsPanel
                    formDetails={formDetail}
                    pageProps={props}
                    key={formDetail.anchorId}
                    visible={true}
                />
            ))}
        </div>
    );
};
