import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { XpImageProps } from 'types/media';
import { ContentType } from 'types/content-props/_content-common';
import { ProductTaxonomy, Taxonomy } from 'types/taxonomies';

const emptyContactOptions = {
    chat: {},
    write: {},
    call: { phoneNumber: '55 55 33 33' },
    navoffice: {},
    aidcentral: {},
    custom: {},
};

const contactOptionPart = (selected: 'chat' | 'write' | 'call') => ({
    path: '',
    type: ComponentType.Part as const,
    descriptor: PartType.KontaktOssKanal as const,
    config: {
        contactOptions: {
            _selected: selected,
            ...emptyContactOptions,
        },
    },
});

export const contactModuleLayout = () => ({
    path: '',
    type: ComponentType.Layout as const,
    descriptor: LayoutType.SituationPageFlexCols as const,
    config: {
        title: 'Finner du ikke svaret her? Ta kontakt med oss',
        anchorId: 'kontakt',
        numCols: 3,
        justifyContent: 'flex-start' as const,
        bgColor: { color: '#f1f1f1' },
    },
    regions: {
        flexcols: {
            components: [contactOptionPart('call')],
            name: 'flexcols' as const,
        },
    },
});

export const productContactModuleLayout = () => ({
    path: '',
    type: ComponentType.Layout as const,
    descriptor: LayoutType.ProductPageFlexCols as const,
    config: {
        usageContext: 'contact-channels',
        title: 'Finner du ikke svaret her? Ta kontakt med oss',
        anchorId: 'kontakt',
    },
    regions: {
        flexcols: {
            components: [contactOptionPart('call')],
            name: 'flexcols' as const,
        },
    },
});

export const htmlAreaPart = (html: string, expandable?: { title: string; anchorId?: string }) => ({
    path: '',
    type: ComponentType.Part as const,
    descriptor: PartType.HtmlArea as const,
    config: {
        html: {
            processedHtml: html,
            macros: [],
        },
        expandable: !!expandable,
        expandableTitle: expandable?.title ?? '',
        expandableAnchorId: expandable?.anchorId,
        filters: [],
    },
});

export const dynamicHeader = (title: string, anchorId: string) => ({
    path: '',
    type: ComponentType.Part as const,
    descriptor: PartType.Header as const,
    config: {
        title,
        anchorId,
        titleTag: 'h3' as const,
    },
});

export const productCardPart = (
    title: string,
    ingress: string,
    taxonomy: Taxonomy[] = [ProductTaxonomy.BENEFITS]
) => ({
    path: '',
    type: ComponentType.Part as const,
    descriptor: PartType.ProductCard as const,
    config: {
        targetPage: {
            _id: '',
            _path: '',
            createdTime: '2022-01-01T00:00:00Z',
            modifiedTime: '2025-01-01T00:00:00Z',
            type: ContentType.ProductPage as const,
            displayName: title,
            language: 'no' as const,
            data: {
                taxonomy,
                title,
                ingress,
                illustration: { type: ContentType.Pictograms as const, data: { icons: [] } },
                area: [],
            },
            page: {},
        } as any,
    },
});

export const sectionWithHeader = (
    config: {
        title?: string;
        anchorId?: string;
        icon?: { icon: XpImageProps; color?: string; size?: number };
    },
    contentComponents: (ReturnType<typeof htmlAreaPart> | ReturnType<typeof dynamicHeader>)[]
) => ({
    path: '',
    type: ComponentType.Layout as const,
    descriptor: LayoutType.SectionWithHeader as const,
    config: {
        ...config,
        border: { width: 3, rounded: false, color: '#ffffff' },
    },
    regions: {
        intro: { components: [] as never[], name: 'intro' as const },
        content: { components: contentComponents, name: 'content' as const },
    },
});
