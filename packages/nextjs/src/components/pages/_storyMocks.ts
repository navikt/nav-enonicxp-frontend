import { ComponentType } from 'types/component-props/_component-common';
import { LayoutType } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';

const emptyContactOptions = {
    chat: {},
    write: {},
    call: { phoneNumber: '55 55 33 33' },
    navoffice: {},
    aidcentral: {},
    custom: {},
};

const contactOptionPart = (path: string, selected: 'chat' | 'write' | 'call') => ({
    path,
    type: ComponentType.Part as const,
    descriptor: PartType.KontaktOssKanal as const,
    config: {
        contactOptions: {
            _selected: selected,
            ...emptyContactOptions,
        },
    },
});

export const contactModuleLayout = (basePath: string) => ({
    path: basePath,
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
            components: [
                contactOptionPart(`${basePath}/flexcols/0`, 'chat'),
                contactOptionPart(`${basePath}/flexcols/1`, 'write'),
                contactOptionPart(`${basePath}/flexcols/2`, 'call'),
            ],
            name: 'flexcols' as const,
        },
    },
});

export const htmlAreaPart = (
    path: string,
    html: string,
    expandable?: { title: string; anchorId?: string }
) => ({
    path,
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

export const sectionWithHeader = (
    path: string,
    config: {
        title?: string;
        anchorId?: string;
    },
    contentComponents: ReturnType<typeof htmlAreaPart>[]
) => ({
    path,
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
