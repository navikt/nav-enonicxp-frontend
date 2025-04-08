import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { LinkPanel } from 'types/link-panel';
import LenkepanelNavNo from 'components/_common/lenkepanel-legacy/LenkepanelNavNo';
import { getUrlFromContent } from 'utils/links-from-content';

import style from './LenkepanelListe.module.scss';

type Props = {
    title?: string;
    ingress?: string;
    items?: LinkPanel[];
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
            {ingress && (
                <BodyLong size={'large'} className={style.ingress}>
                    {ingress}
                </BodyLong>
            )}
            {items && (
                <div className={style.items}>
                    {items.map((item) => {
                        const url = item.url?.ref
                            ? getUrlFromContent(item.url.ref)
                            : item.url?.text;

                        if (!url) {
                            return null;
                        }

                        return (
                            <LenkepanelNavNo
                                href={url}
                                tittel={item.title}
                                className={style.item}
                                component={'link-panel'}
                                linkGroup={title}
                                key={item.title}
                            >
                                {item.ingress && <BodyLong>{item.ingress}</BodyLong>}
                            </LenkepanelNavNo>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
