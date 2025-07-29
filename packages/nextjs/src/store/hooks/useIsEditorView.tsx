import { usePageContentProps } from 'store/pageContext';

export const useIsEditorView = () => {
    const { editorView, isPagePreview } = usePageContentProps();

    return editorView || isPagePreview;
};
