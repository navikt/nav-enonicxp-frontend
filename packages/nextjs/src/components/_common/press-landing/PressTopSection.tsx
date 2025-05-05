import { Heading } from '@navikt/ds-react';
import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';

import styles from './PressTopSection.module.scss';

type PressTopSectionProps = {
    page: Pick<PressLandingPageProps, 'displayName' | 'data'>;
};

export const PressTopSection = (props: PressTopSectionProps) => {
    const { displayName, data } = props.page;
    const { pressCall, title } = data;

    return (
        <section className={styles.pressTopSection}>
            <div className={styles.content}>
                <Heading size={'xlarge'} level={'1'}>
                    {title ?? displayName}
                </Heading>
                {pressCall && (
                    <div className={styles.pressCall}>
                        <ParsedHtml htmlProps={pressCall} />
                    </div>
                )}
            </div>
        </section>
    );
};
