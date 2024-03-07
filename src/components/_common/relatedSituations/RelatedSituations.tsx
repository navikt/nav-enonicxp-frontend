import { BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ContentProps } from 'types/content-props/_content-common';
import { MicroCard } from '../card/MicroCard';
import { stripXpPathPrefix } from 'utils/urls';
import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import styles from './RelatedSituations.module.scss';
import { classNames } from 'utils/classnames';

type RelatedSituationsProps = {
    relatedSituations: ContentProps[];
    pageProps: ContentProps;
    config: {
        title: string;
        description: string;
    };
};

export const RelatedSituations = ({
    relatedSituations,
    config,
    pageProps,
}: RelatedSituationsProps) => {
    const { language, pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (!config) {
        return null;
    }
    const { title, description } = config;
    const getStringPart = translator('related', language);

    // If the page is in preview mode, related situations from the page props will be empty,
    // so display a note about 'mark as ready' to the editor, as we can't actually
    // display the situations until the page has been refreshed.
    const isComponentPreviewMode = pageProps._id === '';

    if (isComponentPreviewMode) {
        return (
            <EditorHelp
                type={'info'}
                text={
                    'Aktuelle situasjoner vises her når du klikker "marker som klar".'
                }
            />
        );
    }

    if (!relatedSituations || relatedSituations.length === 0) {
        return (
            <EditorHelp
                type={'error'}
                text={
                    'Feil: Du har huket av for å vise aktuelle situasjoner i denne seksjonen, men ingen situasjoner er valgt i metadata til venstre.'
                }
            />
        );
    }

    return (
        <div
            className={classNames(
                styles.relatedSituations,
                editorView === 'edit' && styles.noMargin
            )}
        >
            <Heading level="3" size="medium" spacing>
                {title || getStringPart('otherOffers')}
            </Heading>
            <BodyLong className={styles.description}>
                {description || getStringPart('moreInformation')}
            </BodyLong>
            <ul className={styles.situationsList}>
                {relatedSituations.map((situation) => {
                    const link: LinkProps = {
                        url: stripXpPathPrefix(situation._path),
                        text: situation.data.title || situation.displayName,
                    };
                    return (
                        <li key={situation._id}>
                            <MicroCard link={link} type={CardType.Situation} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
