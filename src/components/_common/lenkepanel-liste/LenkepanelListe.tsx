import React from 'react';
import { LinkPanel } from 'types/link-panel';
import { BEM } from 'utils/classnames';
import { BodyLong, Heading, Ingress } from '@navikt/ds-react';
import LenkepanelNavNo from '../lenkepanel/LenkepanelNavNo';
import { getUrlFromContent } from '../../../utils/links-from-content';

type Props = {
    title?: string;
    ingress?: string;
    items?: LinkPanel[];
    className?: string;
};

export const LenkepanelListe = ({ title, ingress, items }: Props) => {
    const bem = BEM('lenkepanel-liste');

    return (
        <section className={bem()} aria-label={title}>
            {title && (
                <div className={bem('tittel')}>
                    <Heading level="2" size="large">
                        {title}
                    </Heading>
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
