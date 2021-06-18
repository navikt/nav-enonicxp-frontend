export enum MacroType {
    Button = 'button',
    ButtonBlue = 'button-blue',
    ChatbotLink = 'chatbot-link',
    ChevronLinkInternal = 'chevron-link-internal',
    ChevronLinkExternal = 'chevron-link-external',
    Fotnote = 'fotnote',
    GlobalValue = 'global-value',
    GlobalValueWithMath = 'global-value-with-math',
    HeaderWithAnchor = 'header-with-anchor',
    HtmlFragment = 'html-fragment',
    InfoBoks = 'infoBoks',
    Ingress = 'ingress',
    LenkeFiler = 'lenkeFiler',
    PhoneLink = 'phone-link',
    ProductCardMini = 'product-card-mini',
    Quote = 'quote',
    Tankestrek = 'tankestrek',
    VarselBoks = 'varselBoks',
    Video = 'video',
}

export type MacroPropsCommon = {
    ref: string;
    name: MacroType;
};
