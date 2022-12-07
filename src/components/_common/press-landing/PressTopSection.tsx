import { Heading } from '@navikt/ds-react';
import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

import styles from './PressTopSection.module.scss';

type PressTopSectionProps = {
    page: PressLandingPageProps;
};

export const PressTopSection = (props: PressTopSectionProps) => {
    const { displayName, data } = props.page;
    const { pressCall } = data;

    return (
        <div className={styles.pressTopSection}>
            <div className={styles.content}>
                <Heading size={'xlarge'} level={'1'}>
                    {displayName}
                </Heading>
                <div className={styles.pressCall}>
                    <ParsedHtml htmlProps={pressCall} />
                </div>
            </div>
        </div>
    );
};
