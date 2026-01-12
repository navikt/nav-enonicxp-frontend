import React from 'react';
import {
    PartDeprecatedType,
    PartLegacyType,
    PartComponentProps,
    PartType,
    PartTypeAll,
} from 'types/component-props/parts';
import { ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { BEM, classNames } from 'utils/classnames';
import { HtmlAreaPart } from 'components/parts/html-area/HtmlAreaPart';
import { ProductCardPart } from 'components/parts/product-card/ProductCardPart';
import { ProductCardMicroPart } from 'components/parts/product-card-micro/ProductCardMicroPart';
import { editorAuthstateClassname } from 'components/_common/authDependantRender/editorAuthstateClassname/EditorAuthstateClassname';
import { UxSignalsWidgetPart } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { UserTestsPart } from 'components/parts/user-tests/UserTestsPart';
import { ProductCardMiniPart } from 'components/parts/product-card-mini/ProductCardMiniPart';
import { MainPanelsLegacyPart } from 'components/parts/_legacy/main-panels/MainPanelsLegacyPart';
import { MenuListLegacyPart } from 'components/parts/_legacy/menu-list/MenuListLegacyPart';
import { PageHeadingLegacyPart } from 'components/parts/_legacy/page-heading/PageHeadingLegacyPart';
import { PageListLegacyPart } from 'components/parts/_legacy/page-list/PageListLegacyPart';
import { OfficeInformationLegacyPart } from 'components/parts/_legacy/office-information/OfficeInformationLegacyPart';
import { LinkListsLegacyPart } from 'components/parts/_legacy/link-lists/LinkListsLegacyPart';
import { PublishingCalendarLegacyPart } from 'components/parts/_legacy/publishing-calendar/PublishingCalendarLegacyPart';
import { PublishingCalendarEntryLegacyPart } from 'components/parts/_legacy/publishing-calendar/PublishingCalendarEntryLegacyPart';
import { ComponentEditorProps } from 'components/ComponentMapper';
import { KapittelNavigasjonLegacyPart } from './_legacy/kapittel-navigasjon/KapittelNavigasjonLegacyPart';
import { ArtikkelLegacyPart } from './_legacy/artikkel/ArtikkelLegacyPart';
import { SeksjonForSnarveierPaForsideForPrivatpersonPart } from './seksjon-for-snarveier-pa-forside-for-privatperson/SeksjonForSnarveierPaForsideForPrivatpersonPart';
import { SeksjonForSnarveierPart } from './seksjon-for-snarveier/SeksjonForSnarveierPart';
import { SeksjonForAktuelleTemaerPart } from './seksjon-for-aktuelle-temaer/SeksjonForAktuelleTemaerPart';
import { FiltreringsmenyPart } from './filtreringsmeny/FiltreringsmenyPart';
import { KalkulatorPart } from './kalkulator/KalkulatorPart';
import { VarselboksPart } from './varselboks/VarselboksPart';
import { LenkepanelPart } from './lenkepanelPart/LenkepanelPart';
import { LinkPanelsLegacyPart } from './_legacy/link-panels/LinkPanelsLegacyPart';
import { HeaderPart } from './header/HeaderPart';
import { LenkelistePart } from './lenkeliste/LenkelistePart';
import { NewsListPart } from './news-list/NewsListPart';
import { ProductDetailsPart } from './product-details/ProductDetailsPart';
import { PageHeaderPart } from './page-header/PageHeaderPart';
import { ButtonPart } from './button/ButtonPart';
import { ProviderCardPart } from './provider-card/ProviderCardPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { DetaljinformasjonForDetAktuelleKontoretPart } from './detaljinformasjon-for-det-aktuelle-kontoret/DetaljinformasjonForDetAktuelleKontoretPart';
import { KontaktOssKanalPart } from './kontakt-oss-kanal/KontaktOssKanalPart';
import { PayoutDatesPart } from './payout-dates/PayoutDatesPart';
import { OmradekortPart } from './omradekort/OmradekortPart';
import { SituasjonskortPart } from './situasjonskort/SituasjonskortPart';
import { KortForInnloggetBrukerPart } from './kort-for-innlogget-bruker/KortForInnloggetBrukerPart';
import { SeksjonForKontaktinformasjonPart } from './seksjon-for-kontaktinformasjon/SeksjonForKontaktinformasjonPart';
import { SkjemadetaljerPart } from './skjemadetaljer/SkjemadetaljerPart';
import { ReadMorePart } from './readMorePart/ReadMorePart';
import { TrekkspillPart } from './trekkspill/TrekkspillPart';
import { RelatedSituationsPart } from './related-situations/RelatedSituationsPart';

import styles from './PartsMapper.module.scss';

const partsDeprecated: ReadonlySet<PartTypeAll> = new Set([
    PartDeprecatedType.Notifications,
    PartDeprecatedType.BreakingNews,
    PartDeprecatedType.PageCrumbs,
]) satisfies ReadonlySet<PartDeprecatedType>;

const bem = BEM(ComponentType.Part);

const PartComponentMapper = ({
    partProps,
    pageProps,
}: {
    partProps: PartComponentProps;
    pageProps: ContentProps;
}) => {
    switch (partProps.descriptor) {
        case PartType.Trekkspill:
            return <TrekkspillPart {...partProps} />;
        case PartType.Varselboks:
            return <VarselboksPart {...partProps} />;
        case PartType.Omradekort:
            return <OmradekortPart {...partProps} />;
        case PartType.Situasjonskort:
            return <SituasjonskortPart {...partProps} />;
        case PartType.Button:
            return <ButtonPart {...partProps} />;
        case PartType.Kalkulator:
            return <KalkulatorPart {...partProps} />;
        case PartType.KontaktOssKanal:
            return <KontaktOssKanalPart {...partProps} />;
        case PartType.Filtreringsmeny:
            return <FiltreringsmenyPart {...partProps} />;
        case PartType.Skjemadetaljer:
            return <SkjemadetaljerPart {...partProps} />;
        case PartType.SeksjonForKontaktinformasjon:
            return <SeksjonForKontaktinformasjonPart {...partProps} />;
        case PartType.SeksjonForAktuelleTemaer:
            return <SeksjonForAktuelleTemaerPart {...partProps} />;
        case PartType.SeksjonForSnarveier:
            return <SeksjonForSnarveierPart {...partProps} />;
        case PartType.SeksjonForSnarveierPaForsideForPrivatperson:
            return <SeksjonForSnarveierPaForsideForPrivatpersonPart {...partProps} />;
        case PartType.Header:
            return <HeaderPart {...partProps} />;
        case PartType.HtmlArea:
            return <HtmlAreaPart {...partProps} />;
        case PartType.Lenkeliste:
            return <LenkelistePart {...partProps} />;
        case PartType.Lenkepanel:
            return <LenkepanelPart {...partProps} />;
        case PartType.KortForInnloggetBruker:
            return <KortForInnloggetBrukerPart {...partProps} />;
        case PartType.NewsList:
            return <NewsListPart {...partProps} />;
        case PartType.DetaljinformasjonForDetAktuelleKontoret:
            return <DetaljinformasjonForDetAktuelleKontoretPart {...partProps} />;
        case PartType.PageHeader:
            return <PageHeaderPart {...partProps} />;
        case PartType.PageNavigationMenu:
            return <PageNavigationMenuPart {...partProps} />;
        case PartType.PayoutDates:
            return <PayoutDatesPart {...partProps} />;
        case PartType.ProductCard:
            return <ProductCardPart {...partProps} />;
        case PartType.ProductCardMini:
            return <ProductCardMiniPart {...partProps} />;
        case PartType.ProductCardMicro:
            return <ProductCardMicroPart {...partProps} />;
        case PartType.ProductDetails:
            return <ProductDetailsPart {...partProps} />;
        case PartType.ProviderCard:
            return <ProviderCardPart {...partProps} />;
        case PartType.ReadMore:
            return <ReadMorePart {...partProps} />;
        case PartType.RelatedSituations:
            return <RelatedSituationsPart {...partProps} />;
        case PartType.UserTests:
            return <UserTestsPart {...partProps} />;
        case PartType.UxSignalsWidget:
            return <UxSignalsWidgetPart {...partProps} />;

        case PartLegacyType.LinkLists:
            return <LinkListsLegacyPart {...pageProps} />;
        case PartLegacyType.LinkPanels:
            return <LinkPanelsLegacyPart {...pageProps} />;
        case PartLegacyType.Artikkel:
            return <ArtikkelLegacyPart {...pageProps} />;
        case PartLegacyType.ArtikkelLinkedList:
            return <KapittelNavigasjonLegacyPart {...pageProps} />;
        case PartLegacyType.MainPanels:
            return <MainPanelsLegacyPart {...pageProps} />;
        case PartLegacyType.MenuList:
            return <MenuListLegacyPart {...pageProps} />;
        case PartLegacyType.OfficeInformation:
            return <OfficeInformationLegacyPart {...pageProps} />;
        case PartLegacyType.PageHeading:
            return <PageHeadingLegacyPart {...pageProps} />;
        case PartLegacyType.PageList:
            return <PageListLegacyPart {...pageProps} />;
        case PartLegacyType.PublishingCalendar:
            return <PublishingCalendarLegacyPart {...pageProps} />;
        case PartLegacyType.PublishingCalendarEntry:
            return <PublishingCalendarEntryLegacyPart {...pageProps} />;

        default:
            return (
                <EditorHelp
                    text={`Part-komponenten er ikke implementert: "${partProps.descriptor}"`}
                    type={'info'}
                />
            );
    }
};

type Props = {
    partProps: PartComponentProps;
    pageProps: ContentProps;
    editorProps?: ComponentEditorProps;
};

export const PartsMapper = ({ pageProps, partProps, editorProps }: Props) => {
    const { descriptor, config } = partProps;

    const isEditView = pageProps.editorView === 'edit';

    if (!descriptor || partsDeprecated.has(descriptor)) {
        // We still need to render invalid components in the editor to prevent errors
        // and allow users to remove the invalid component
        return editorProps ? <div {...editorProps} /> : null;
    }

    const partName = descriptor.split(':')[1];
    const renderOnAuthState = config?.renderOnAuthState;

    return (
        <div
            className={classNames(
                bem(),
                bem(partName),
                isEditView && renderOnAuthState && editorAuthstateClassname(renderOnAuthState),
                partName === PartType.PageNavigationMenu.split(':')[1] &&
                    styles.pageNavigationMenuPart
            )}
            {...editorProps}
        >
            <PartComponentMapper pageProps={pageProps} partProps={partProps} />
        </div>
    );
};
