import { useAppSelector } from '../store';
import {
    currentPageId,
    currentLanguage,
    currentEditorView,
    isPagePreview,
    pageAudience,
} from '../slices/pageConfig';
import { Language } from 'translations';
import { ContentProps } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';

type PageConfig = {
    pageId: string;
    editorView: ContentProps['editorView'];
    isPagePreview: boolean;
};

export type UsePageConfig = {
    pageConfig: PageConfig;
    language: Language;
    audience: Audience;
};

export const usePageConfig = (): UsePageConfig => {
    const pageId = useAppSelector<string>((state) => currentPageId(state));
    const language = useAppSelector<Language>((state) =>
        currentLanguage(state)
    );
    const editorView = useAppSelector((state) => currentEditorView(state));
    const isPreview = useAppSelector((state) => isPagePreview(state));
    const audience = useAppSelector((state) => pageAudience(state));

    const pageConfig = {
        pageId,
        editorView,
        isPagePreview: isPreview,
    };

    return { pageConfig, language, audience };
};
