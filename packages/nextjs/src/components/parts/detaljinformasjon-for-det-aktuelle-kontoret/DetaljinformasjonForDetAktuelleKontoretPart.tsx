import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { OfficeDetailsData } from 'types/content-props/office-details-props';
import { ContentType } from 'types/content-props/_content-common';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { ServiceInformation } from './detaljer/ServiceInformation';
import { SocialHelpLinks } from './detaljer/SocialHelpLinks';
import { SocialHelpPayoutInformation } from './detaljer/SocialHelpPayoutInformation';
import { SocialHelpPostalInformation } from './detaljer/SocialHelpPostalInformation';
import { PlaceholderIndicator } from './PlaceholderIndicator';

enum DetailType {
    SERVICE_INFORMATION = 'serviceInformation',
    SOCIAL_HELP_LINKS = 'socialHelpLinks',
    SOCIAL_HELP_POSTAL_INFORMATION = 'socialHelpPostalInformation',
    SOCIAL_HELP_PAYOUT_INFORMATION = 'socialHelpPayoutInformation',
}

const detailComponents: Record<
    DetailType,
    React.FunctionComponent<DetaljinformasjonForDetAktuelleKontoretProps>
> = {
    [DetailType.SERVICE_INFORMATION]: ServiceInformation,
    [DetailType.SOCIAL_HELP_LINKS]: SocialHelpLinks,
    [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]: SocialHelpPayoutInformation,
    [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]: SocialHelpPostalInformation,
};

// Note these texts are presented to editors only to give an idea
// of what information the placeholder represent.
const editorTranslation: Record<DetailType, string> = {
    [DetailType.SERVICE_INFORMATION]: 'informasjon om tjenestene til kontoret.',
    [DetailType.SOCIAL_HELP_LINKS]: 'lenke til søknad om sosialhjelp.',
    [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]: 'informasjon om utbetaling av sosialhjelp',
    [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]:
        'informasjon om postkasse/henting av søknad for sosialhjelp.',
};

export type DetaljinformasjonForDetAktuelleKontoretProps = {
    officeData: OfficeDetailsData;
};

export type PartConfigDetaljinformasjonForDetAktuelleKontoret = {
    detailType?: DetailType;
};

export const DetaljinformasjonForDetAktuelleKontoretPart = ({
    config,
}: PartComponentProps<PartType.DetaljinformasjonForDetAktuelleKontoret>) => {
    const pageProps = usePageContentProps();
    const { detailType } = config;

    if (!detailType) {
        return (
            <EditorHelp text="Angi hvilken informasjon fra kontoret som skal vises her ved å velge fra innstillingene til høyre." />
        );
    }

    // If editing the editorial page directy, we can't merge any actual
    // office data into the editorial parts, so just show the placeholder
    if (pageProps.type === ContentType.OfficeEditorialPage) {
        return (
            <PlaceholderIndicator>
                {`Her plasseres både felles tjenester for alle kontorene og kontor-spesifikk ${editorTranslation[detailType]}`}
            </PlaceholderIndicator>
        );
    }

    if (pageProps.type !== ContentType.OfficePage) {
        return null;
    }

    const officeData = pageProps.data.officeNorgData.data;

    if (!officeData) {
        return null;
    }

    const DetailComponent = detailComponents[detailType];
    if (!DetailComponent) {
        return null;
    }

    return <DetailComponent officeData={officeData} />;
};
