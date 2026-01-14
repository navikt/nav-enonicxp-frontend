import { Heading } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ProcessedHtmlProps } from 'types/processed-html-props';

import styles from './LinkedIn.module.scss';

type Props = {
    text: ProcessedHtmlProps | string;
};

export const LinkedIn = ({ text }: Props) => {
    return (
        <div className={styles.linkedinWrapper}>
            <div className={styles.linkedIn}>
                <Heading level="2" size="large" spacing>
                    Følg oss på LinkedIn
                </Heading>
                <ParsedHtml htmlProps={text} />
            </div>
        </div>
    );
};
