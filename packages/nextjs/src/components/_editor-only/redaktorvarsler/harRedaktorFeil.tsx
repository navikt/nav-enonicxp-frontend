import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjon } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjon';
import { FragmentUtenforInnholdsseksjon } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjon';
import { HtmlAreaInnholderDiv } from './varsler/html-area-div/HtmlAreaInnholderDiv';

export const harRedaktorfeil = (content: ContentProps): boolean => {
    const isEditorView = content.editorView === 'edit' || content.editorView === 'preview';

    if (!isEditorView) {
        return false;
    }
    return [
        KortUrlVarsel({ content }),
        SkjemanummerVarsel({ content }),
        KontaktinformasjonVarsel({ content }),
        FormatertInnholdUtenforInnholdsseksjon({ content }),
        FragmentUtenforInnholdsseksjon({ content }),
        HtmlAreaInnholderDiv({ content }),
    ].some((result) => result !== null);
};
