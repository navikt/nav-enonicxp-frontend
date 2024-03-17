import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import React from 'react';
import {
    DetailType,
    OfficeEditorialDetailProps,
} from '../../../types/component-props/part-configs/office-editorial-detail';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { ContentType } from 'types/content-props/_content-common';
import { ServiceInformation } from './details/ServiceInformation';
import { SocialHelpLinks } from './details/SocialHelpLinks';
import { SocialHelpPayoutInformation } from './details/SocialHelpPayoutInformation';
import { SocialHelpPostalInformation } from './details/SocialHelpPostalInformation';
import { PlaceholderIndicator } from './PlaceholderIndicator';

const getDetailComponent = (
    type: DetailType
): React.FunctionComponent<DetailProps> => {
    const detailComponents = {
        [DetailType.SERVICE_INFORMATION]: ServiceInformation,
        [DetailType.SOCIAL_HELP_LINKS]: SocialHelpLinks,
        [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]:
            SocialHelpPayoutInformation,
        [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]:
            SocialHelpPostalInformation,
    };

    return detailComponents[type];
};

export type DetailProps = {
    officeData: OfficeDetailsData;
};

export const OfficeEditorialDetail = ({
    config,
    pageProps,
}: OfficeEditorialDetailProps) => {
    const { detailType } = config;

    if (!detailType) {
        return (
            <EditorHelp text="Angi hvilken informasjon fra kontoret som skal vises her ved å velge fra innstillingene til høyre." />
        );
    }

    // Note these texts are presented to editors only to give an idea
    // of what information the placeholder represent.
    const editorTranslation: { [key in DetailType]: string } = {
        [DetailType.SERVICE_INFORMATION]:
            'informasjon om tjenestene til kontoret.',
        [DetailType.SOCIAL_HELP_LINKS]: 'lenke til søknad om sosialhjelp.',
        [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]:
            'informasjon om utbetaling av sosialhjelp',
        [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]:
            'informasjon om postkasse/henting av søknad for sosialhjelp.',
    };

    // If editing the editorial page directy, we can't merge any actual
    // office data into the editorial parts, so just show the placeholder
    if (pageProps.type === ContentType.OfficeEditorialPage) {
        return (
            <PlaceholderIndicator>
                {`Her plasseres både felles tjenester for alle kontorene og kontor-spesifikk ${editorTranslation[detailType]}`}
            </PlaceholderIndicator>
        );
    }

    const DetailComponent = getDetailComponent(detailType);
    if (!DetailComponent) {
        return null;
    }

    return <DetailComponent officeData={pageProps.data} />;
};
