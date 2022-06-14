import React from 'react';
import { LinkPanel } from 'types/link-panel';
import { BodyLong, Heading, Ingress } from '@navikt/ds-react';
import LenkepanelNavNo from '../lenkepanel/LenkepanelNavNo';
import { getUrlFromContent } from '../../../utils/links-from-content';

import style from './LenkepanelListe.module.scss';

type Props = {
    title?: string;
    ingress?: string;
    items?: LinkPanel[];
    className?: string;
};

export const LenkepanelListe = ({ title, ingress, items }: Props) => {
    return (
        <section className={style.lenkepanelListe} aria-label={title}>
            {title && (
                <div className={style.tittel}>
                    <Heading level="2" size="large">
                        {title}
                    </Heading>
                </div>
            )}
            {ingress && <Ingress className={style.ingress}>{ingress}</Ingress>}
            {items && (
                <div className={style.items}>
                    {items.map((item) => {
                        const url =
                            getUrlFromContent(item.url?.ref) ||
                            item.url?.text ||
                            '';
                        return (
                            <LenkepanelNavNo
                                href={url}
                                tittel={item.title}
                                className={style.item}
                                component={'link-panel'}
                                linkGroup={title}
                                key={item.title}
                            >
                                {item.ingress && (
                                    <BodyLong>{item.ingress}</BodyLong>
                                )}
                            </LenkepanelNavNo>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
