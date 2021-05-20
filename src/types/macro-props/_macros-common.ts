export enum MacroType {
    Button = 'no.nav.navno:button',
    ButtonBlue = 'no.nav.navno:button-blue',
    ChevronLinkInternal = 'no.nav.navno:chevron-link-internal',
    ChevronLinkExternal = 'no.nav.navno:chevron-link-external',
    Fotnote = 'no.nav.navno:fotnote',
    Infoboks = 'no.nav.navno:infoBoks',
    LenkeFiler = 'no.nav.navno:lenkeFiler',
    PhoneLink = 'no.nav.navno:phone-link',
    Quote = 'no.nav.navno:quote',
    Tankestrek = 'no.nav.navno:tankestrek',
    VarselBoks = 'no.nav.navno:varselBoks',
    Video = 'no.nav.navno:video',
}

export type MacroPropsCommon = {
    ref: string;
    descriptor: MacroType;
};
