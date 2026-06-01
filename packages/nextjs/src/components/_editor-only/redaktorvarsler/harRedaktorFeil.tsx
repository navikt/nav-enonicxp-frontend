import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { DuplikateIder } from './varsler/duplikate-ider/DuplikateIder';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjonVarsel } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjonVarsel';
import { FragmentUtenforInnholdsseksjonVarsel } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjonVarsel';
import { HtmlAreaInnholderDivVarsel } from './varsler/html-area-div/HtmlAreaInnholderDivVarsel';

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
        FormatertInnholdUtenforInnholdsseksjonVarsel({ content }) !== null ||
        FragmentUtenforInnholdsseksjonVarsel({ content }) !== null ||
        HtmlAreaInnholderDivVarsel({ content }) !== null
    );
};
