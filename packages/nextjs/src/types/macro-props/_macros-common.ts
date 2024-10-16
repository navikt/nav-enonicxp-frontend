export enum MacroType {
    AlertBox = 'alert-box',
    Button = 'button',
    ButtonBlue = 'button-blue',
    ChatbotLink = 'chatbot-link',
    ChevronLinkInternal = 'chevron-link-internal',
    ChevronLinkExternal = 'chevron-link-external',
    Fotnote = 'fotnote',
    FormDetails = 'form-details',
    GlobalValue = 'global-value',
    GlobalValueWithMath = 'global-value-with-math',
    HeaderWithAnchor = 'header-with-anchor',
    HtmlFragment = 'html-fragment',
    InfoBoks = 'infoBoks',
    Ingress = 'ingress',
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
    VarselBoks = 'varselBoks',
    Video = 'video',
}

export type MacroPropsCommon = {
    ref: string;
    name: MacroType;
};
