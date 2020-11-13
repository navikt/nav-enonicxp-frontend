import React from 'react';
import { LinkPanel } from 'types/link-panel';
import { BEM } from 'utils/bem';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../lenkepanel/LenkepanelNavNo';
import './LenkepanelListe.less';
import { LenkeMedIngress } from '../lenke-med-ingress/LenkeMedIngress';

type Props = {
    title?: string;
    ingress?: string;
    items?: LinkPanel[];
    className?: string;
};

export const LenkepanelListe = ({ title, ingress, items }: Props) => {
    const bem = BEM('lenkepanel-liste');

    return (
        <div className={bem()}>
            {title && (
                <div className={bem('tittel')}>
                    <Innholdstittel>{title}</Innholdstittel>
                </div>
            )}
            {ingress && <Ingress className={bem('ingress')}>{ingress}</Ingress>}
            {items && (
                <div className={bem('items')}>
                    {items.map((item) => (
                        <LenkeMedIngress
                            tittel={item.title}
                            href={item.url.text || ''}
                            className={bem('item')}
                            key={item.title}
                        >
                            {item.ingress && (
                                <Normaltekst>{item.ingress}</Normaltekst>
                            )}
                        </LenkeMedIngress>
                    ))}
                </div>
            )}
        </div>
    );
};
