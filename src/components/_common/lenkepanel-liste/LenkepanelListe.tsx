import React from 'react';
import { LinkPanel } from 'types/link-panel';
import { BEM } from 'utils/bem';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import LenkepanelNavNo from '../lenkepanel/LenkepanelNavNo';
import { getUrlFromContent } from '../../../utils/links-from-content';
import './LenkepanelListe.less';

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
                    <Innholdstittel tag={'h2'}>{title}</Innholdstittel>
                </div>
            )}
            {ingress && <Ingress className={bem('ingress')}>{ingress}</Ingress>}
            {items && (
                <div className={bem('items')}>
                    {items.map((item) => {
                        const url =
                            getUrlFromContent(item.url?.ref) ||
                            item.url?.text ||
                            '';

                        return (
                            <LenkepanelNavNo
                                href={url}
                                tittel={item.title}
                                className={bem('item')}
                                component={'link-panel'}
                                linkGroup={title}
                                key={item.title}
                            >
                                {item.ingress && (
                                    <Normaltekst>{item.ingress}</Normaltekst>
                                )}
                            </LenkepanelNavNo>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
