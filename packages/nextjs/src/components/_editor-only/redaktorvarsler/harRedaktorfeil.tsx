import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { DuplikateIder } from './varsler/duplikate-ider/DuplikateIder';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjon } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjon';
import { FragmentUtenforInnholdsseksjon } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjon';
import { HtmlAreaDiv } from './varsler/html-area-div/HtmlAreaDiv';

export const harRedaktorfeil = (content: ContentProps): boolean => {
    const isEditorView = content.editorView === 'edit' || content.editorView === 'preview';

    if (!isEditorView) {
        return false;
    }
    return (
        KortUrlVarsel({ content }) !== null ||
        DuplikateIder({}) !== null ||
        SkjemanummerVarsel({ content }) !== null ||
        KontaktinformasjonVarsel({ content }) !== null ||
        FormatertInnholdUtenforInnholdsseksjon({ content }) !== null ||
        FragmentUtenforInnholdsseksjon({ content }) !== null ||
        HtmlAreaDiv({ content }) !== null
    );
};
