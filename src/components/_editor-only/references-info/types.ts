export type ReferenceType = 'general' | 'macros' | 'components';

export type ReferencesDataByType = {
    [key in ReferenceType]?: ReferenceItem[];
};

export type ReferenceItem = {
    name: string;
    path: string;
    id: string;
    locale: string;
    editorPath?: string;
};
