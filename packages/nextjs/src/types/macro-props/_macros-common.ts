export enum MacroType {
    ButtonBlue = 'button-blue',
    ChatbotLink = 'chatbot-link',
    ConsentBannerLink = 'consent-banner-link',
    ChevronLinkInternal = 'chevron-link-internal',
    ChevronLinkExternal = 'chevron-link-external',
    Fotnote = 'fotnote',
    Skjemadetaljer = 'form-details',
    GlobalValue = 'global-value',
    GlobalValueWithMath = 'global-value-with-math',
    HeaderWithAnchor = 'header-with-anchor',
    HtmlFragment = 'html-fragment',
    InfoBoks = 'infoBoks',
    Ingress = 'ingress',
    Knapp = 'button',
    LenkeFiler = 'lenkeFiler',
    LinkToLayer = 'link-to-layer',
    PayoutDates = 'payout-dates',
    PhoneLink = 'phone-link',
    ProductCardMini = 'product-card-mini',
    ProductCardMicro = 'product-card-micro',
    Quote = 'quote',
    Saksbehandlingstid = 'saksbehandlingstid',
    Tall = 'tall',
    Tankestrek = 'tankestrek',
    UxSignalsWidget = 'uxsignals-widget',
    Varselboks = 'alert-box',
    VarselBoksDeprecated = 'varselBoks',
    Video = 'video',
}

export type MacroPropsCommon = {
    ref: string;
    name: MacroType;
};
